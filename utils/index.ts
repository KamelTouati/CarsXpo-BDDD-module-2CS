export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (value) {
        searchParams.set(type, value);
    } else {
        searchParams.delete(type);
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathname;
}

