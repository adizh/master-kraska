import VsToast from "@vuesimple/vs-toast";

export const useNotif = (type: string, text: string, header: string) => {
  return VsToast.show({
    title: header,
    message: text,
    variant: type,
    position: "bottom-right",
  });
};
