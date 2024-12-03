
const useIsValidUrl = (url : string)=>{
    try {
        const parsedUrl = new URL(url);
        const hostName = parsedUrl.hostname;
        
        if(hostName.includes('amazon')) return true;
        else return false;
    } catch (error) {
        return false;
    }
    return false;
}

export default useIsValidUrl;