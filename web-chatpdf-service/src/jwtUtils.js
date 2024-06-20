function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        // id 정보만 추출
        return {
            userId: payload.id  // 페이로드에서 id를 userId로 매핑
        };
    } catch (e) {
        return null;  // 파싱에 실패하면 null 반환
    }
}

export default parseJwt;


