const INIT_Descriptor = require("../../descriptors/main.json");

class Descriptor {
  static hasDescriptor = () => !!localStorage.getItem("face_descriptor");

  static getDescriptor = () =>
    JSON.parse(localStorage.getItem("face_descriptor"));

  static getInitDescriptor = () => {
    localStorage.setItem("face_descriptor", JSON.stringify(INIT_Descriptor));

    return INIT_Descriptor;
  };

  static setDescriptor = descriptor =>
    localStorage.setItem("face_descriptor", descriptor);

  static removeDescriptor = () => localStorage.removeItem("face_descriptor");
}

export default Descriptor;
