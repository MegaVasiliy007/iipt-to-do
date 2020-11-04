export default ({$axios}) => {
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    $axios.setBaseURL('http://localhost:8080')
}
