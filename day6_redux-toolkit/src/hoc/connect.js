import { PureComponent } from "react";
import { StoreContext } from "./StoreContext";

// connect原理: 本质就是高阶组件
export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrapperComponent) {
    class NewComponent extends PureComponent {
      static contextType = StoreContext;

      constructor(props) {
        super(props);
        // 在 constructor 中不能访问 this.context，所以设置空状态
        this.state = {};
      }

      componentDidMount() {
        // 在 componentDidMount 中，this.context 已经可用
        this.setState(mapStateToProps(this.context.getState()));
        this.unsubscribe = this.context.subscribe(() => {
          this.setState(mapStateToProps(this.context.getState()));
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const stateObj = mapStateToProps(this.context.getState()); 
        const dispatchObj = mapDispatchToProps(this.context.dispatch);
        return <WrapperComponent {...this.props} {...stateObj} {...dispatchObj} />
      }
    }
    return NewComponent;
  }
}

