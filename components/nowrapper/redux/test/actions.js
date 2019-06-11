/**
 * Created by lei_sun on 2017/11/6.
 */
export const INIT_PAGE = 'INIT_PAGE';
export const initPageInfo = (params) => ({
    type: INIT_PAGE,
    ...params
});

export const ADD_PAGE_NUM = 'ADD_PAGE_NUM';
export const addPageNum = (params) => ({
    type: ADD_PAGE_NUM,
    ...params
});

export const SUBTRACT_PAGE_NUM = 'SUBTRACT_PAGE_NUM';
export const subtractPageNum = (params) => ({
    type: SUBTRACT_PAGE_NUM,
    ...params
});

export const FINISH_LOADING = 'FINISH_LOADING';
export const finishLoading = (params) => {
    return function (dispatch) {
        setTimeout(()=>{
            dispatch({
                type: FINISH_LOADING,
                ...params
            });
        }, 1000);
    };
};