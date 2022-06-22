import palette from "./palette";
import tagStore from "./tagStore";
import userStore from "./userStore";

const useStore = () => ({ userStore, palette, tagStore })

export default useStore;