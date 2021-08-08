export default (req, res) => {
    res.clearPreviewData();
    res.end('Preview mode disabled successfully.');
}