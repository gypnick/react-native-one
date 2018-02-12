import React, {Component} from 'react';
import {
    View,
    WebView,
    ToastAndroid,
    Dimensions,
    TextInput

} from 'react-native';
import TitleBar from "../../components/TitleBar";
import {images} from "../../resource"
import {ImageButton, LaudView} from "../../components"
/**
 * Created by yunpeng on
 * Desc:
 */
export default class ItemDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            htmlUrl: "",
            html: "加载中。。。",
        }
    }

    render() {
        console.log("==ItemDetail===>"+this.state.html.length);
        return (
            <View style={{flexDirection:"column",flex:1}}>
                <TitleBar
                    titleText={this._renderTitle()}
                    leftIco={images.back_btn}
                    rightIco={images.bubble_collect}
                    navigation={this.props.navigation}
                />
                <WebView
                    javaScriptEnabled={true}
                    source={{html: this.state.html}}
                />
                <View style={{position:"absolute",height:50,width:Dimensions.get("window").width,backgroundColor:"#FBFBFB",borderWidth:1,borderTopColor:"#E2E2E2",bottom:0,left:0,right:0,flexDirection: "row", justifyContent: "space-between",alignItems:"center"}}>
                    <TextInput
                        style={{height:30,width:100,borderWidth:1,borderRadius:4,borderColor:"#A6A6A6",marginLeft:20,fontSize:8,backgroundColor:"#fff"}}
                        underlineColorAndroid="transparent"
                        placeholder={"写一个评论.."}
                    />
                    <View style={{flexDirection: "row", alignItems: "center",marginRight:20}}>
                        <LaudView/>
                        <ImageButton
                            source={images.bottom_comment}
                            style={{height: 18, width: 18,marginLeft:30}}
                        />
                        <ImageButton
                            source={images.bubble_share}
                            style={{height: 18, width: 18,marginLeft:30}}
                        />
                    </View>
                </View>
            </View>



        )
    }


    /**
     * 返回标题
     * @returns {*}
     * @private
     */
    _renderTitle() {
       // let data= event.nativeEvent.data;
        let item = this.props.navigation.state.params.item;
        let title;
        switch (item.category) {
            case "1":
                title = "ONE STORY";
                break;
            case "2":
                title = "连载";
                break;
            case "3":
                title = "问答";
                break;
            case "4":
                title = "音乐";
                break;
            case "5":
                title = "电影";
                break;
        }
        return title;


    }

    _getApiUrl() {
        let item = this.props.navigation.state.params.item;
        switch (item.category) {
            case "1":
                this.state.htmlUrl = "http://v3.wufazhuce.com:8000/api/essay/htmlcontent/" + item.item_id;
                break;
            case "2":
                this.state.htmlUrl = "http://v3.wufazhuce.com:8000/api/question/htmlcontent/" + item.item_id;
                break;
            case "3":
                this.state.htmlUrl = "http://v3.wufazhuce.com:8000/api/serialcontent/htmlcontent/" + item.item_id;
                break;
            case "4":
                this.state.htmlUrl = "http://v3.wufazhuce.com:8000/api/music/htmlcontent/" + item.item_id;
                break;
            case "5":
                this.state.htmlUrl = "http://v3.wufazhuce.com:8000/api/movie/htmlcontent/" + item.item_id;
                break;
            case "6":
                break;
        }

    }


    _fetchHtml() {
        fetch(this.state.htmlUrl)
            .then(response => response.json())
            .then(responseJson => {
                console.log("==_fetchHtml==>"+responseJson.data.html_content.length);
                this.setState({
                    html: responseJson.data.html_content,
                })


            })
            .catch(() => {

            })
    }

    componentDidMount() {
        this._getApiUrl();
        this._fetchHtml();
    }
}
