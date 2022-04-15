export const baseUrl: string = 'https://norma.nomoreparties.space/api'

interface IResponse {
    body: string,
    bodyUsed: boolean,
    headers: object,
    ok: boolean,
    redirected: boolean,
    status: number,
    statusText: string,
    type: string,
    url: string,
    json(): any;
}

export const checkResponse = (res: IResponse) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const initScroll = (scrollContainer: HTMLElement | null, negativeItems: (HTMLElement | null)[] ): void => {
    setTimeout(() => {
        if (scrollContainer) {
            const scrollContainerTop: number = scrollContainer.getBoundingClientRect().top || 0;
            let negativeScrollHeight: number = 0
            negativeItems && negativeItems.forEach((item): number => negativeScrollHeight += item ? item && item.getBoundingClientRect().height : 0 )
            const maxHeight: number = window.innerHeight - scrollContainerTop - 40 - negativeScrollHeight
            scrollContainer.style.height = `${maxHeight}px`
        }
    }, 0)
}