import wrapWithProvider from "./provider";
export const onInitialClientRender = () => {
    setTimeout(function() {
        document.getElementById("___loader").style.display = "none"
    }, 1000)
}
export const wrapRootElement = wrapWithProvider;