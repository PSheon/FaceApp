import Descriptor from "app/utils/descriptor";

export const LOAD_DESCRIPTOR_FROM_LOCALSTORAGE =
  "[DESCRIPTOR] LOAD FROM LOCALSTORAGE";

export const initDescriptor = () => async dispatch => {
  if (Descriptor.hasDescriptor) {
    const descriptor = Descriptor.getDescriptor();

    dispatch({
      type: LOAD_DESCRIPTOR_FROM_LOCALSTORAGE,
      payload: { descriptor }
    });
  } else {
    const initDescriptor = Descriptor.getInitDescriptor();

    dispatch({
      type: LOAD_DESCRIPTOR_FROM_LOCALSTORAGE,
      payload: {
        descriptor: initDescriptor
      }
    });
  }
};
