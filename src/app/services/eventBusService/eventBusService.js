import FuseUtils from '@fuse/FuseUtils';
import axios from 'axios';
import formurlencoded from 'form-urlencoded';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';

class eventBusService extends FuseUtils.EventEmitter {

  /* Get Uploaded Images */
  getUploadedImages = (routeParams = {
    page: 1,
    limit: 20,
    sort: 'updatedAt',
    order: -1
  }) => {
    return new Promise((resolve, reject) => {
      axios.get(AUTH_REST_BASE_END_POINT + "/api/image", {
        params: routeParams
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /* Delete Image by imageId */
  deleteImage = imageId => {
    return new Promise((resolve, reject) => {
      axios.delete(AUTH_REST_BASE_END_POINT + "/api/image/" + imageId)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /* Update Image by imageId */
  updateImageById = (imageDetail) => {
    return new Promise((resolve, reject) => {
      axios.post(AUTH_REST_BASE_END_POINT + "/api/image/update", formurlencoded(imageDetail))
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /* Get Uploaded Documents */
  getUploadedDocuments = (routeParams = {
    page: 1,
    limit: 20,
    sort: 'updatedAt',
    order: -1
  }) => {
    return new Promise((resolve, reject) => {
      axios.get(AUTH_REST_BASE_END_POINT + "/api/document", {
        params: routeParams
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /* Delete Document by documentId */
  deleteDocument = documentId => {
    return new Promise((resolve, reject) => {
      axios.delete(AUTH_REST_BASE_END_POINT + "/api/document/" + documentId)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /* Create or Update carousel */
  createOrUpdateCarousel = (carouselDetail) => {
    return new Promise((resolve, reject) => {
      if (carouselDetail._id === 'new') {
        /* Create a carousel */
        axios.post(AUTH_REST_BASE_END_POINT + '/api/carousel', formurlencoded(carouselDetail))
          .then(response => {
            if (response.data) {
              resolve(response.data);
            }
            // else {
            // 	reject(response.data.error);
            // }
          })
          .catch(error => {
            reject(error);
          });
      } else {
        /* Update a carousel */
        axios.post(AUTH_REST_BASE_END_POINT + '/api/carousel/update', formurlencoded(carouselDetail))
          .then(response => {
            if (response.data) {
              resolve(response.data);
            }
            // else {
            // 	reject(response.data.error);
            // }
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  };

  /* Delete carousel */
  deleteCarousel = (carouselId) => {
    return new Promise((resolve, reject) => {
      axios.delete(AUTH_REST_BASE_END_POINT + '/api/carousel/' + carouselId)
        .then(response => {
          if (response.data) {
            resolve(response.data);
          }
          // else {
          // 	reject(response.data.error);
          // }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  /* Get Home Page News */
  getHomePageNews = (routeParams = {
    page: 1,
    limit: 20,
    sort: 'updatedAt',
    order: -1
  }) => {
    return new Promise((resolve, reject) => {
      axios.get(AUTH_REST_BASE_END_POINT + "/api/news", {
        params: routeParams
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /* Create or Update News */
  createOrUpdateNews = (newsDetail) => {
    return new Promise((resolve, reject) => {
      if (newsDetail._id === 'new') {
        /* Create a news */
        axios.post(AUTH_REST_BASE_END_POINT + '/api/news', formurlencoded(newsDetail))
          .then(response => {
            if (response.data) {
              resolve(response.data);
            }
            // else {
            // 	reject(response.data.error);
            // }
          })
          .catch(error => {
            reject(error);
          });
      } else {
        /* Update a news */
        axios.post(AUTH_REST_BASE_END_POINT + '/api/news/update', formurlencoded(newsDetail))
          .then(response => {
            if (response.data) {
              resolve(response.data);
            }
            // else {
            // 	reject(response.data.error);
            // }
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  };

  /* Delete news */
  deleteNews = (newsId) => {
    return new Promise((resolve, reject) => {
      axios.delete(AUTH_REST_BASE_END_POINT + '/api/news/' + newsId)
        .then(response => {
          if (response.data) {
            resolve(response.data);
          }
          // else {
          // 	reject(response.data.error);
          // }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  /* Update User Profile */
  updateProfile = (userDetail) => {
    return new Promise((resolve, reject) => {
      axios.post(AUTH_REST_BASE_END_POINT + '/api/profile/update', formurlencoded(userDetail))
        .then(response => {
          if (response.data) {
            resolve(response.data);
          }
          // else {
          // 	reject(response.data.error);
          // }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const eventBusInstance = new eventBusService();

export default eventBusInstance;
