/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    ART,
    TouchableOpacity,
    Modal,
    Animated,
    Easing,
    Image
} from 'react-native';

const {
    Path,
    Shape,
    Group,
    Surface,
}  = ART;

let AnimatedModal = Animated.createAnimatedComponent(Modal);

let {height, width} = Dimensions.get('window');

const bottomViewPath = new Path()
    .moveTo(0, 40)
    .arcTo(width, 40, width + width / 2, 0)
    .lineTo(width, height / 3 * 2)
    .lineTo(0, height / 3 * 2)
    .close();

const modalViewPath = new Path()
    .moveTo(0, 40)
    .arcTo(width, 40, width + width / 2, 0)
    .lineTo(width, height / 3 * 2.5)
    .lineTo(0, height / 3 * 2.5)
    .close();

export default class App extends Component<{}> {

    constructor(props) {
        super(props);

        this.state = {
            topViewValue: new Animated.Value(height),
            bottomViewValue: new Animated.Value(height),
            modalVisible: false,
        };

        let startY = null;

        //手势
        this._gestureHandlers = {
            onStartShouldSetResponder: () => true,
            onMoveShouldSetResponder: () => true,
            onResponderTerminationRequest: () => true,
            onResponderGrant: (evt) => {
                startY = null;
            },
            onResponderMove: (evt) => {

                if (startY == null) {
                    startY = evt.nativeEvent.pageY;
                } else {
                    if (startY - evt.nativeEvent.pageY < 0) {
                        if (this.state.modalVisible) {
                            this.disMiss();
                        }
                    }
                }
            },
            onResponderRelease: (evt) => {

            }
        };

    }


    componentDidMount() {
    }


    menuShow = () => {
        this.setState({
            modalVisible: true
        });
    };

    disMiss = () => {

        Animated.parallel([
            Animated.timing(this.state.topViewValue, {
                easing: Easing.linear,
                toValue: height,
                duration: 450,
            }),
            Animated.timing(this.state.bottomViewValue, {
                easing: Easing.linear,
                toValue: height,
                duration: 450,
            })
        ]).start();

        setTimeout(() => {
            this.setState({
                modalVisible: false,
            });
        }, 450);
    };

    onShow = () => {
        Animated.parallel([
            Animated.timing(this.state.topViewValue, {
                easing: Easing.linear,
                toValue: height / 3 * 2,
                duration: 450,
            }),
            Animated.timing(this.state.bottomViewValue, {
                easing: Easing.linear,
                toValue: height / 3 * 0.5,
                duration: 450,
            })
        ]).start();

    };

    renderMenuView = () => {
        return (
            <AnimatedModal
                onShow={()=>this.onShow()}
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
            >
                <Animated.View style={{
                        position: 'absolute',
                        width: width,
                        height: height / 3,
                        backgroundColor:'#f5d730',
                        left: 0,
                        bottom: this.state.topViewValue
                    }}>

                    <TouchableOpacity
                        style={{
                            flex:1,
                            marginTop: 40,
                            marginRight: 20,
                            flexDirection:'row',
                            justifyContent:'flex-end'
                        }}
                        onPress={() => this.disMiss()}
                    >
                        <View><Text style={{fontSize: 30}}>{`×`}</Text></View>
                    </TouchableOpacity>

                </Animated.View>


                <Animated.View
                    {...this._gestureHandlers}
                    style={{
                        position: 'absolute',
                        height: height / 3 * 2.5,
                        width: width,
                        backgroundColor:'#ffff9900',
                        left: 0,
                        top: this.state.bottomViewValue,
                    }}
                >

                    <Surface width={width} height={height / 3 * 2.5}>
                        <Shape d={modalViewPath} strokeWidth={0.1} fill={'#ffffff'}
                               strokeCap="butt" strokeJoin="bevel"/>
                    </Surface>
                    <View style={{
                        position: 'absolute',
                        width: 70,
                        height: 70,
                        left: 40,
                        top: 0,
                        backgroundColor: 'red',
                        borderRadius: 35,
                    }}>
                        <Image style={{width: 70, height: 70, borderRadius: 35}} source={require('./toys.jpg')}>

                        </Image>
                    </View>
                </Animated.View>
            </AnimatedModal>
        );


    };

    render() {
        return (
            <View style={styles.container}>

                <View style={{
                    width: width,
                    height: 200,
                    backgroundColor: '#FFFFFF00'
                }}>
                    <Surface width={width} height={100}>
                        <Shape d={bottomViewPath} strokeWidth={0.1} fill={'#ffffff'}
                               strokeCap="butt" strokeJoin="bevel"/>
                    </Surface>
                    <View style={{
                        height: 100,
                        backgroundColor:'#ffffff',
                        justifyContent: 'flex-end',
                        paddingHorizontal: 20
                     }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    width: 40,
                                }}
                                onPress={() => this.menuShow()}
                            >
                                <Text>{`个人`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    width: 40,
                                }}
                            >
                                <Text>{`礼物`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {this.renderMenuView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
