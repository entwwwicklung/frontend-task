# vue-task

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# Few words about the task

* Since I had troubles using https://github.com/cornerstonejs/dicomParser to parse data and render image to canvas I've used https://www.npmjs.com/package/dicom.ts since you said that I can use any library out there
* For drawing rectangles I've chosen fabric.js
* The app itself works and it does what was specified, there is a lot of room for improvement and it is not pixel-perfect due to limited amount of time I had
* I've used vuex, I believe that you wanted me to use a store (vuex) for storing data, which I did for some data. I believe one improvement would be storing more data specific to image/rectangles in the store, however I was not aware of the full spec - what should happen to image/data afterwards in which format etc it needs to be sent to back-end, etc...

# Issues

* Just noticed an issue with scaling, drawing canvas is not scaling perfectly so there is some offset visible on some screens when resizing browser window but due to lack of time didn't have time to address this issue, if necessary I will address that issue and get back to you
* For any other issues that might occur, please let me know so I can fix them