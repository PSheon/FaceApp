import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Typography, Hidden, Checkbox, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import VisibilitySensor from "react-visibility-sensor";
import moment from 'moment';

import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import { mimnTypeConverter, bytesToSizeConverter } from 'app/utils';

function ImagesTable(props) {
	const dispatch = useDispatch();
	const IMAGE = useSelector(({ uploads }) => uploads.image);
	const images = IMAGE.docs
	const selectedItemId = IMAGE.selectedItemId;

	const [isLoadingNextPageImages, setIsLoadingNextPageImages] = useState(false);

	function handleOnPageBottom() {
		if (!IMAGE.hasNextPage) return
		setIsLoadingNextPageImages(true);

		const params = {
			page: IMAGE.nextPage,
			limit: 20,
			sort: 'updatedAt',
			order: -1
		}

		eventBusService.getUploadedImages(params)
			.then(response => {
				dispatch({
					type: Actions.APPEND_NEXT_PAGE_UPLOADED_IMAGES_LIST,
					payload: response
				});

				setIsLoadingNextPageImages(false)
			})
	}
	function handleImageSelect(imageId) {
		dispatch(Actions.setSelectedImageId(imageId))
		props.pageLayout.current.toggleRightSidebar()
	}

	if (!images.length) {
		return (
			<div className="flex justify-center items-center h-full">
				<Typography variant="h6" color="textSecondary">
					還沒有圖片，上傳第一張圖片吧！
				</Typography>
			</div>
		)
	}

	return (
		<FuseAnimateGroup animation="transition.slideUpIn" delay={300}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className="max-w-64 w-64 p-0 text-center">
							<IconButton>
								<Icon>more_horiz</Icon>
							</IconButton>
							{/* <Menu>
								<MenuList>
									<MenuItem>
										<ListItemIcon className="min-w-40">
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu> */}
						</TableCell>
						<TableCell className="text-center max-w-64 w-64 p-0"></TableCell>
						<TableCell className="text-left sm:text-center">說明</TableCell>
						<TableCell className="text-center hidden sm:table-cell">類型</TableCell>
						<TableCell className="text-center hidden sm:table-cell">作者</TableCell>
						<TableCell className="text-center hidden sm:table-cell">尺寸</TableCell>
						<TableCell className="text-center hidden sm:table-cell">大小</TableCell>
						<TableCell className="text-center hidden sm:table-cell sm:text-left">修改日期</TableCell>
						<Hidden lgUp>
							<TableCell className="w-64 p-0 text-center"></TableCell>
						</Hidden>
					</TableRow>
				</TableHead>

				<TableBody>
					{Object.entries(images).map(([key, image]) => (
						<TableRow
							key={key}
							hover
							// onClick={event => dispatch(Actions.setSelectedImageId(image._id))}
							onClick={event => handleImageSelect(image._id)}
							selected={image._id === selectedItemId}
							className="cursor-pointer"
						>
							<TableCell className="w-48 px-4 sm:px-12" padding="checkbox">
								<Checkbox
									checked={false}
								/>
							</TableCell>
							<TableCell className="w-88 p-0 text-center">
								<img className="w-full block rounded-12 p-8" src={imageNameToPathConverter(image.imageName)} alt={image.imageName} />
							</TableCell>
							<TableCell className="text-left max-w-64 sm:max-w-128 truncate sm:text-center">{image.imageCaption}</TableCell>
							<TableCell className="text-center hidden sm:table-cell">{mimnTypeConverter(image.mimeType)}</TableCell>
							<TableCell className="text-center hidden sm:table-cell">{image.author.displayName}</TableCell>
							<TableCell className="text-center hidden sm:table-cell">{image.imageHeight && image.imageWidth ? `${image.imageHeight} X ${image.imageWidth}` : '-'}</TableCell>
							<TableCell className="text-center hidden sm:table-cell">{image.imageSize === '' ? '-' : bytesToSizeConverter(image.imageSize)}</TableCell>
							<TableCell className="text-center hidden sm:table-cell sm:text-left">{moment(image.updatedAt).format('YYYY-MM-DD')}</TableCell>
							<Hidden lgUp>
								<TableCell>
									<IconButton
										// onClick={(ev) => props.pageLayout.current.toggleRightSidebar()}
										aria-label="open right sidebar"
									>
										<Icon>info</Icon>
									</IconButton>
								</TableCell>
							</Hidden>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<VisibilitySensor>
				{({ isVisible }) => {
					return (
						<div className="flex justify-center items-center w-full min-h-10">
							{isLoadingNextPageImages && <LoadingSpinner width={128} height={128} />}
							{isVisible && !isLoadingNextPageImages && handleOnPageBottom()}
							{/* {!IMAGE.hasNextPage && (
								<FuseAnimate delay={500}>
									<Typography variant="h5" color="textSecondary" className="mb-16">
										...沒有更多圖片了...
								</Typography>
								</FuseAnimate>
							)} */}
						</div>
					)
				}}
			</VisibilitySensor>
		</FuseAnimateGroup>
	);
}

export default ImagesTable;
