import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin';

export default {
    plugins: [
        postcssPxToViewport({
            viewportWidth: 1920,
            viewportHeight: 1080,
        })
    ]
}