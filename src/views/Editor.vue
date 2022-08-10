<template>
	<div>
		<Tools />
		<RectangleList />
		<canvas id="dicom-canvas">
		</canvas>
		<canvas id="editor-canvas">
		</canvas>
	</div>

</template>

<script>
import { fabric } from 'fabric';
import { parseImage, Renderer } from 'dicom.ts';
import { mapGetters, mapActions, mapState } from 'vuex';

import RectangleList from '@/components/RectangleList.vue';
import Tools from '@/components/Tools.vue';

export default {
  name: 'Editor',
  data() {
    return {
			canvas: null,
			rect: null,
			isDown: false,
			origX: null,
			origY: null,
		}
  },
  methods: {
		...mapActions('editor', [
			'addRectangle',
			'deleteRectangle',
			'setSelectedRectangle',
		]),
		selectRectangle(uuid) {
			const _this = this;
			this.canvas.getObjects().forEach(function(o) {
					if(o.id === uuid) {
							_this.canvas.setActiveObject(o);
					}
			})
			this.canvas.renderAll();
		},
		deleteFabricObjectById(uuid) {
			const _this = this;
			this.canvas.getObjects().forEach(function(o) {
					if(o.id === uuid) {
							_this.canvas.remove(o);
					}
			})
			this.canvas.discardActiveObject().renderAll();
		},
    initiateRectangleTool() {
			const _this = this;
			document.addEventListener('keyup', function(e) {
				if (e.key === 'Delete' || e.key === 'Backspace') {
					if (_this.selectedRectangle) {
						_this.deleteRectangle(_this.selectedRectangle);
					}
				}
			})

			this.canvas.on('mouse:down', function(o) {
				_this.isDown = true;
				var pointer = _this.canvas.getPointer(o.e);
				_this.origX = pointer.x;
				_this.origY = pointer.y;
				var pointer = _this.canvas.getPointer(o.e);
				var uuid = crypto.randomUUID();
				_this.rect = new fabric.Rect({
					id: uuid,
					left: _this.origX,
					top: _this.origY,
					originX: 'left',
					originY: 'top',
					width: pointer.x - _this.origX,
					height: pointer.y - _this.origY,
					angle: 0,
					stroke: 'rgba(255,0,0)',
					strokeWidth: 3,
					transparentCorners: false,
					fill: 'transparent',
					strokeUniform: true,
				});

				_this.canvas.add(_this.rect);
			});

			this.canvas.on('mouse:move', function(o) {
				if (!_this.isDown) return;
				var objects = _this.canvas.getObjects();
				var activeObject = _this.canvas.getActiveObject();
				if (activeObject && objects.length != 0) {
					return;
				}
				var pointer = _this.canvas.getPointer(o.e);

				if (_this.origX > pointer.x) {
					_this.rect.set({
						left: Math.abs(pointer.x)
					});
				}
				if (_this.origY > pointer.y) {
					_this.rect.set({
						top: Math.abs(pointer.y)
					});
				}

				_this.rect.set({
					width: Math.abs(_this.origX - pointer.x)
				});
				_this.rect.set({
					height: Math.abs(_this.origY - pointer.y)
				});

				_this.canvas.renderAll();
			});

			this.canvas.on('mouse:up:before', function(o) {
				var objects = _this.canvas.getObjects();
				var activeObject = _this.canvas.getActiveObject();
				if (activeObject && objects.length != 0) {
					return;
				}
				_this.addRectangle(_this.rect.id);
			});

			this.canvas.on('mouse:up', function(o) {
				_this.isDown = false;
			});

			this.canvas.on('selection:created', function(o) {
				if (o.selected.length > 0) {
					_this.setSelectedRectangle(o.selected[0].id);
				}
			})

			this.canvas.on('selection:updated', function(o) {
				if (o.selected.length > 0) {
					_this.setSelectedRectangle(o.selected[0].id);
				}
			})
    },
  },
  components: {
		Tools,
		RectangleList,
  },
  computed: {
		...mapGetters('editor', ['file']),
		...mapState('editor', [
			'rectangles',
			'selectedRectangle',
			'rectangleToolActive',
			]
		),
  },
  watch: {
    rectangles: {
			handler: function (newArr, oldArr) {
				var diff = oldArr.filter(x => !newArr.includes(x));
				const _this = this;
				diff.forEach(uuid => _this.deleteFabricObjectById(uuid));
    	},
			deep: true
		},
		selectedRectangle: function(val) {
			this.selectRectangle(val);
		},
		rectangleToolActive: function(val) {
			if (val === true) {
				this.initiateRectangleTool();
			} else {
				this.canvas.__eventListeners["mouse:down"] = [];
				this.canvas.__eventListeners["mouse:up"] = [];
				this.canvas.__eventListeners["mouse:up:before"] = [];
				this.canvas.__eventListeners["mouse:move"] = [];
			}
		}
  },
	created() {
		if (!this.file) {
			this.$router.push({path: '/'})
		}
	},
  mounted() {
    const fr = new FileReader()
		const dicomCanvas = document.getElementById('dicom-canvas');
		const _this = this;
    fr.onload = function(e) {
      try {
				const image = parseImage(new DataView(e.target.result));

				var width = image.tags['00280011'].value[0]
				var height = image.tags['00280010'].value[0]

				dicomCanvas.width = width;
				dicomCanvas.height = height;

				const renderer = new Renderer(dicomCanvas);
        renderer.render(image, 0);

				const editorCanvas = new fabric.Canvas('editor-canvas', {
					width: dicomCanvas.clientWidth,
					height: dicomCanvas.clientHeight
				});
				_this.canvas = editorCanvas;

				var img = new Image();
				img.src = dicomCanvas.toDataURL();
				fabric.Image.fromURL(dicomCanvas.toDataURL(), function(img) {
					_this.canvas.setBackgroundImage(img, _this.canvas.renderAll.bind(_this.canvas), {
							scaleX: _this.canvas.width / img.width,
							scaleY: _this.canvas.height / img.height
					});
				});
      } 
      catch (err) {
        console.error(err);
      }
  	}
    fr.readAsArrayBuffer(this.file);
  }
}
</script>

<style scoped>
    canvas {
			top: 0;
			left: 0;
			position: absolute;
	}
</style>