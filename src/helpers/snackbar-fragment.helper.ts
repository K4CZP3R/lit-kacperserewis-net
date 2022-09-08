export function createSnackbarFragment(text: string){
    const fragment = new DocumentFragment();

    const span = document.createElement('span');
    span.textContent = text;
    fragment.appendChild(span);

    return fragment;

}