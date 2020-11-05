export default ({$axios}) => {
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    $axios.setBaseURL('https://apitodo.vlos.ru')
}
