import wrapWithProvider from "./provider";
export const onInitialClientRender = () => {
    setTimeout(function() {
        document.getElementById("___loader").style.display = "none"
    }, 4500)
}
export const wrapRootElement = wrapWithProvider;