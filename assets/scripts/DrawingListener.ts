const {ccclass, property} = cc._decorator;

interface Segment {
    p1: cc.Vec2;
    p2: cc.Vec2;
}

@ccclass
export default class DrawingListener extends cc.Component {

    @property segmentRadius: number = 5.0;

    private prePoint: cc.Vec2;
    private curPoint: cc.Vec2;
    private segments: Segment[];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.segments = [];

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    // update (dt) {}

    onTouchBegan(event: cc.Event.EventTouch) {
        this.curPoint = event.getLocation();
        this.prePoint = this.curPoint.clone();

        cc.log(`touch began ${this.curPoint.x}, ${this.curPoint.y}`);
    }

    onTouchMoved(event: cc.Event.EventTouch) {
        this.curPoint = event.getLocation();
        cc.log(`touch moved ${this.curPoint.x}, ${this.curPoint.y}`);

        const div = new cc.Vec2(this.prePoint.x - this.curPoint.x, this.prePoint.y - this.curPoint.y);
        const distance = Math.sqrt(div.x ** 2 + div.y ** 2);
        cc.log(`distance ${distance}`);

        if (distance > this.segmentRadius * 2) {
            const seg = {
                p1: this.prePoint.clone(),
                p2: this.curPoint.clone()
            };
            this.segments.push(seg);

            this.prePoint = this.curPoint;

            const winSize = cc.director.getWinSize();

            const drawing = this.node.getComponent(cc.Graphics);
            drawing.lineWidth = 6;
            drawing.moveTo(seg.p1.x - winSize.width / 2, seg.p1.y - winSize.height / 2);
            drawing.lineTo(seg.p2.x - winSize.width / 2, seg.p2.y - winSize.height / 2);
            drawing.strokeColor = cc.Color.RED;
            drawing.stroke();
            drawing.fill();
        }
    }

    onTouchEnded(event: cc.Event.EventTouch) {
        
    }

    onTouchCancel() {

    }
}
