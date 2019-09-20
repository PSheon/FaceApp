import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";

// TODO 完善 地圖 功能
import { MAP_BOX_API_KEY } from 'app/fuse-configs/envsConfig';

const MapBox = ReactMapboxGl({
	minZoom: 4,
	maxZoom: 15,
	scrollZoom: false,
	accessToken: MAP_BOX_API_KEY
});

function WidgetMaps(props) {
	const MAP_LABELS = useSelector(({ markets }) => markets.map.labels);
	const [popupOpen, setPopupOpen] = useState(false);
	const [label, setLabel] = useState({
		category: 'default',
		created_on: 1377198523,
		id: 568,
		lat: 40.2999382,
		lon: -111.6469702,
		name: 'La Nay Ferme',
	});

	const handlePopup = (label) => {
		setLabel(label);
		setPopupOpen(true);
	}

	return (
		<Card className="w-full h-512 rounded-8 shadow-none border-1">
			<MapBox
				// eslint-disable-next-line
				style="mapbox://styles/mapbox/streets-v9"
				center={[121.459569, 20.165402]}
				zoom={[4]}
				containerStyle={{
					height: "100%",
					width: "100%"
				}}
			>
				<Layer
					type="symbol"
					id="marker"
					layout={{ "icon-image": "marker-15" }}
				>
					{MAP_LABELS.length && (
						MAP_LABELS.map(label => (
							<Feature
								key={label.id}
								// onMouseEnter={onToggleHover.bind(this, 'pointer')}
								// onMouseLeave={onToggleHover.bind(this, '')}
								onClick={() => handlePopup(label)}
								coordinates={[label.lon, label.lat]}
							/>
						))
					)}
				</Layer>
				{popupOpen && (
					<Popup coordinates={[label.lon, label.lat]}>
						<div className="bg-black">
							<div className="text-white">{label.name}</div>
							<div className="text-white">
								{label.category}
							</div>
						</div>
					</Popup>
				)}
			</MapBox>
		</Card>
	);
}

export default WidgetMaps;
