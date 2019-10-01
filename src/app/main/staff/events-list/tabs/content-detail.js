import React from 'react';
import { FuseAnimate } from '@fuse';
import FroalaEditor from 'react-froala-wysiwyg';
import _ from '@lodash';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/languages/zh_tw.js';

function ContentetailEdit(props) {
  const { form, setForm } = props;

  return (
    <FuseAnimate animation="transition.slideRightIn" delay={300}>
      <div className="mx-36 pb-128">
        <FroalaEditor
          tag="div"
          model={form.content}
          config={{
            placeholderText: '寫點活動內容吧！',
            language: 'zh_tw',
            heightMin: 350,
            heightMax: 550,
            toolbarInline: true,
            toolbarVisibleWithoutSelection: true,
            dragInline: false,
            pluginsEnabled: [
              'align',
              'codeBeautifier',
              'colors',
              'draggable',
              'embedly',
              'emoticons',
              'entities',
              'fontAwesome',
              'fontSize',
              'image',
              'imageManager',
              'lineBreaker',
              'lineHeight',
              'link',
              'lists',
              'paragraphFormat',
              'paragraphStyle',
              'quote',
              'save',
              'url',
              'video',
              'wordPaste'
            ],
            imageInsertButtons: [
              'imageBack',
              '|',
              'imageByURL',
              'imageManager'
            ],
            videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
            linkInsertButtons: ['linkBack'],
            requestHeaders: {
              Authorization:
                'Bearer ' + window.localStorage.getItem('jwt_access_token')
            },
            imageManagerLoadParams: {
              page: 1,
              limit: 20,
              sort: 'updatedAt',
              order: -1
            },
            imageManagerPageSize: 20,
            imageManagerLoadURL: `${AUTH_REST_BASE_END_POINT}/api/image/manager`,
            videoResponsive: true,
            charCounterCount: false,
            tabSpaces: 4,
            imageUpload: false
          }}
          onModelChange={model => {
            setForm(form => _.setIn({ ...form }, 'content', model));
          }}
        />
      </div>
    </FuseAnimate>
  );
}

export default ContentetailEdit;
