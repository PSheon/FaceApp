import React, { useState, useEffect, useCallback } from "react";

import { withRouter } from "react-router-dom";
import { loadModels, getFullFaceDescription } from "app/utils";

// Import image to test API
const testImg = require("../../../../img/chair-man.jpg");

function ImageInput(props) {
  const [imageURL] = useState(testImg);
  const [fullDesc, setFullDesc] = useState(null);

  const handleImage = useCallback(
    async (image = imageURL) => {
      await getFullFaceDescription(image).then(fullDesc => {
        console.log(fullDesc);

        setFullDesc(fullDesc);
      });
    },
    [imageURL]
  );
  useEffect(() => {
    async function init() {
      await loadModels();
      await handleImage(imageURL);
    }

    init();
    /* eslint-disable-next-line */
  }, []);

  return (
    <div>
      <img src={imageURL} alt="imageURL" />

      {fullDesc && (
        <div>
          <pre>{JSON.stringify(fullDesc[0].descriptor, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default withRouter(ImageInput);
