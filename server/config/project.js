/**
 * Created by lei_sun on 2018/2/9.
 */
export default {
    serverPrefix: '/*/skeleton', /** 服务站点URL前缀 */
    aresPrefix: {
        uat: '',
        pro: ''
    },
    serverUrls: [
        {
            url: 'html5',
            ssr: true
        },
        {
            url: 'webapp',
            ssr: false
        }
    ],
    hybridDictionary: '/hybrid',
    ssrParameter: 'isseo=1'
};
