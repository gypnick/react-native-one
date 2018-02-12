import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import PropType from "prop-types";

/**
 * Created by yunpeng on
 * Desc:
 */
export default class TitleBar extends Component {
    constructor(props) {
        super(props)
    }
    //设置参数类型
    static propTypes = {
        //左边按钮,不设置就不显示
        leftIco: PropType.PropTypes.number,
        //右边按钮
        rightIco: PropType.PropTypes.number,
        //右边标题
        rightTitle: PropType.PropTypes.string,
        //中间标题
        titleText: PropType.PropTypes.string,
        //左边点击事件
        leftIcoPress: PropType.PropTypes.func,
        //右边点击事件
        rightIcoPress: PropType.PropTypes.func,
        //传入navigation用于返回事件
        navigation:PropType.PropTypes.object,
    };
    static defaultProps = {
        titleText: "这是标题",
    };

    render() {
        return (
            <View style={{flexDirection:"column"}}>
            <View style={style.contentStyle}>
                <View >
                    {this._renderLeft()}
                </View>
                    <Text
                        //设置文本缩略格式 tail clip
                        ellipsizeMode="tail"
                        //文本行数限制
                        numberOfLines={1}
                        style={style.centerTitleStyle} onPress={() => {
                    }}>{this.props.titleText}</Text>
                <View >
                    {this._returnRight()}
                </View>
            </View>
                <View style={{backgroundColor:"#eee",height:1,width:Dimensions.get("window").width}}/>
            </View>
        )
    }

    /**
     * 左边返回按钮
     * @returns {XML}
     * @private
     */
    _renderLeft(){
        if(!this.props.leftIco){

        } else if(this.props.navigation){
            return(
                <ImageButton
                    style={style.imageStyle}
                    source={this.props.leftIco}
                    onPress={()=>this.props.navigation.goBack()}
                />
            )
        }else if(this.props.leftIcoPress) {
            return(
                <ImageButton
                    style={style.imageStyle}
                    source={this.props.leftIco}
                    onPress={this.props.leftIcoPress}
                />
            )
        }

    }

    /**
     * 返回右边按钮
     * @returns {XML}
     * @private
     */
    _returnRight() {
        if (this.props.rightIco) {
            return <Image style={style.imageStyle} source={this.props.rightIco} onPress={this.props.rightIcoPress}/>;
        } else if (this.props.rightTitle) {
            return <Text
                //设置文本缩略格式 tail clip
                ellipsizeMode="tail"
                //文本行数限制
                numberOfLines={1}
                style={style.rightTitleStyle}>{this.props.rightTitle}</Text>
        }
    }
}

class ImageButton extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress}>
                {this._renderImg()}
            </TouchableOpacity>
        )
    }
    _renderImg(){
        if(this.props.defaultSource){
            return (
                <Image
                    style={this.props.style}
                    source={this.props.defaultSource}
                >
                    <Image
                        style={this.props.style}
                        source={this.props.source}
                    >
                        {this.props.children}
                    </Image>
                </Image>
            )
        }else {
            return (
                <Image
                    style={this.props.style}
                    source={this.props.source}
                >
                    {this.props.children}
                </Image>
            )
        }
    }
}

const style = StyleSheet.create({
    contentStyle: {
        backgroundColor: "#fff",
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    imageStyle: {
        width: 20,
        height: 20,
    },
    centerTitleStyle: {
        position:"absolute",
        left:Dimensions.get("window").width/4,
        right:Dimensions.get("window").width/4,
        color: "#000",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize:18,
        fontWeight:"bold",
    },
    rightTitleStyle: {
        alignSelf: "flex-end",
        color: "#000",
        textAlignVertical: "center"
    }
});