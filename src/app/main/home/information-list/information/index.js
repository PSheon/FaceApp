import React, { useEffect, useState } from 'react';
import { Icon, Typography, Avatar } from '@material-ui/core';
import history from '@history';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import { avatarNameToPathConverter, informationTagConverter, imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/languages/zh_tw.js';

function Information(props) {
  const dispatch = useDispatch();
  const selectedInformationId = props.match.params.informationId;
  const INFORMATION = useSelector(({ homePage }) => homePage.information);
  const isSyncing = INFORMATION.loading;

  const [informationDetail, setInformationDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (INFORMATION.docs.length) {
      const information = INFORMATION.docs.find(item => item._id === selectedInformationId)
      if (!information) {
        history.push({
          pathname: '/information-list'
        })
      } else {
        setInformationDetail(information);
        setIsLoading(false);
      }
    } else {
      /* Information list not inited */
      if (!isSyncing)
        dispatch(Actions.syncHomePageInformationById(selectedInformationId));
    }
  }, [INFORMATION, INFORMATION.docs, dispatch, isSyncing, selectedInformationId]);

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-128 h-128 sm:h-140 sm:min-h-140"
      }}
      header={
        !isLoading && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/information-list" color="inherit">
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  返回 YS 情報列表
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <Avatar src={avatarNameToPathConverter(informationDetail.author.photoURL)} className="mx-10 my-5" alt={informationDetail.author.displayName} />
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="h1" className="text-20 sm:text-32 truncate">
                      {informationDetail.author.displayName}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">{moment(informationDetail.updatedAt).format('LL dddd')}</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
          </div>
        )
      }
      content={
        isLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <LoadingSpinner width={128} height={128} />
          </div>
        ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="bg-transparent overflow-hidden rounded-t-8">
                <img
                  alt={informationDetail.imageName}
                  src={imageNameToPathConverter(informationDetail.imageName)}
                  className="object-cover object-center w-full rounded-t-8 max-h-460"
                />
              </div>
              <div className="flex flex-col max-w-2xl py-16 px-32 justify-center items-start">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="h1" className="text-32 sm:text-40 whitespace-pre-line py-32">
                    {informationDetail.title}
                  </Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="h2" className="text-24 sm:text-32 text-gray-600 whitespace-pre-line pb-20">
                    {informationDetail.subTitle}
                  </Typography>
                </FuseAnimate>
                {/* Tags */}
                <div className="flex justify-center items-center pb-32">
                  <div className="bg-yellow text-20 text-gray-700 px-2 rounded-full uppercase font-semibold tracking-wide px-12 mr-12">
                    {informationTagConverter(informationDetail.tags)}
                  </div>
                </div>
                {/* Content */}
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <FroalaEditorView
                    model={informationDetail.content}
                  />
                </FuseAnimate>
              </div>
            </div>
          )
      }
    />
  )
}

export default Information;
