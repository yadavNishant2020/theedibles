export default {
    isLoggedIn: () => !!localStorage.getItem('token'),

    transformErrorResponse: (resp) => {
        var errorMsg = {};
        let keys = Object.keys(resp);
        keys.forEach((val, ind) => {
            errorMsg[val] = resp[val].join(' | ')
        });
        console.log(errorMsg)
        return errorMsg;
    },

    getWeekNumber(d) {
        return Math.floor(d.getDate() / 7) + 1;
    },
    redirectIfLoggedIn(router) {

        if (this.isLoggedIn()) {
            router.push('/');
            return 1;
        }
    },
    redirectIfLogout(router) {

        if (!this.isLoggedIn()) {
            router.push('/login-register');
            return 1;
        }
    }

}
