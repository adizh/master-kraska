import VsToast from "@vuesimple/vs-toast";

export const useNotif = (type: string, text: string, header: string) => {
  return VsToast.show({
    title: header,
    message: text,
    variant: type,
    position: "bottom-right"
  });
};



export const useNotifLocal = (type: string, text: string, header: string) => {
const {$i18n}=useNuxtApp();
const {t}=$i18n;
console.log(useNuxtApp())
    return VsToast.show({
      title: t(header),
      message: t(text),
      variant: type,
      position: "bottom-right"
    });
};