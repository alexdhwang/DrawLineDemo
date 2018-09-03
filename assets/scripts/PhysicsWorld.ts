const {ccclass, property} = cc._decorator;

@ccclass
export default class PhysicsWorld extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.director.getPhysicsManager().enabled = true;
    }

    // update (dt) {}
}
