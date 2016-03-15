/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Navigator,
    ScrollView,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import Page1 from './page/page1';
import Page2 from './page/page2';
import Page3 from './page/page3';
import Page4 from './page/page4';

import TabBarItrm from './TabBarItem';

var _getRandomRoute = function (str) {
    return {
        randNumber: str,
    };
}

var ROUTE_STACK = [
    _getRandomRoute('Page1'),
    _getRandomRoute('Page2'),
    _getRandomRoute('Page3'),
    _getRandomRoute('Page4')
];
var INIT_ROUTE_INDEX = 0;

class JumpingNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: props.initTabIndex,
        };
    }

    handleWillFocus(route) {
        var tabIndex = ROUTE_STACK.indexOf(route);
        this.setState({tabIndex});
    }

    render() {
        return (
            <View style={styles.tabs}>
                <View style={styles.container}>
                    <TabBarItrm
                        style={{flex:1}}
                        underlayColor="#B5B5B5"
                        image={require("./image/icon_bottomtag_home_n.png")}
                        title="Page1"
                        onPress={()=>{
                            this.props.onTabIndex(0);
                            this.setState({tabIndex:0})
                        }}>
                        ></TabBarItrm>
                    <TabBarItrm
                        style={{flex:1}}
                        underlayColor="#B5B5B5"
                        image={require("./image/icon_bottomtag_market_n.png")}
                        title="Page2"
                        onPress={()=>{
                            this.props.onTabIndex(1);
                            this.setState({tabIndex:1})
                        }}>
                        ></TabBarItrm>
                    <TabBarItrm
                        style={{flex:1}}
                        underlayColor="#B5B5B5"
                        image={require("./image/icon_bottomtag_cart_n.png")}
                        title="Page3"
                        onPress={()=>{
                            this.props.onTabIndex(2);
                            this.setState({tabIndex:2})
                        }}>
                        ></TabBarItrm>
                    <TabBarItrm
                        style={{flex:1}}
                        underlayColor="#B5B5B5"
                        image={require("./image/icon_bottomtag_me_n.png")}
                        title="Page4"
                        onPress={()=>{
                            this.props.onTabIndex(3);
                            this.setState({tabIndex:3})
                        }}>
                        ></TabBarItrm>
                </View>
            </View>
        );
    }
}

class NavigatorTest extends Component {

    render() {
        return (
            <Navigator
                debugOverlay={false}
                style={styles.appContainer}
                ref={(navigator) => {
                  this._navigator = navigator;
                }}
                initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
                initialRouteStack={ROUTE_STACK}
                renderScene={this.renderScene}
                configureScene={() => ({
                  ...Navigator.SceneConfigs.HorizontalSwipeJump,
                })}
                navigationBar={
                  <JumpingNavBar
                    //ref={(navBar) => { this.navBar = navBar; }}
                    initTabIndex={INIT_ROUTE_INDEX}
                    routeStack={ROUTE_STACK}
                    onTabIndex={(index) => {
                      this._navigator.jumpTo(ROUTE_STACK[index]);
                    }}
                  />
                }
            />
        );
    }

    renderScene(route, navigator) {
        var page1, page2, page3, page4;
        if (ROUTE_STACK.indexOf(route) === 0) {
            page1 = (
                <Page1></Page1>
            );
        } else if (ROUTE_STACK.indexOf(route) === 1) {
            page2 = (
                <Page2></Page2>
            )
        } else if (ROUTE_STACK.indexOf(route) === 2) {
            page3 = (
                <Page3></Page3>
            );
        } else if (ROUTE_STACK.indexOf(route) === 3) {
            page4 = (
                <Page4></Page4>
            )
        }
        return (
            <View style={styles.scene}>
                <Text style={styles.messageText}>#{route.randNumber}</Text>
                <View style={{flex:1}}>
                    {page1}
                    {page2}
                    {page3}
                    {page4}
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    appContainer: {
        //flex: 1,
        overflow: 'hidden',
        backgroundColor: '#dddddd',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabs: {
        //height: 50,
        backgroundColor: '#F888FF'
    },
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15,
    },
    scene: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#EAEAEA',
    },
    welcome: {
        fontSize: 20
    }
});

AppRegistry.registerComponent('NavigatorTest', () => NavigatorTest);
