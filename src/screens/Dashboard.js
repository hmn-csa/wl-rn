import React, { useState, useEffect } from 'react'
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator
} from 'react-native'
import { Button } from 'react-native-paper';
import { connect } from "react-redux"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actUpdateShowlist, actSetTodoShowlist, actGetUptrails, actSetActiveStaff } from "../actions"
import { colors } from '../styles'
import { color } from 'react-native-reanimated';
import { SHOWLIST_CLEAR } from '../consts';
import Loader from '../components/elements/Loader'

function Dashboard(props) {
  const [loading, setLoading] = useState(false)
  const handleShowTodo = () => {
    const list_todo = Object.values(props.data).filter(appl => appl.todo_flag == 1).map(a => a.appl_id);
    props.navigation.navigate('Portfolio', { screen: 'List' });
    props.updateShowlist(list_todo)
  }
  const handleShow = (list, isTodo) => {
    props.setTodoShowlist(isTodo)
    props.navigation.navigate('Portfolio', { screen: 'List' })
    props.updateShowlist(list)
  }
  const moneyFormat = n => {
    const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
    return money.substring(0, money.length - 2)
  }
  if (props.fetching || props.data === null) 
  return (
    <Loader/>
  )
  else 
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 3 }}>
        <View style={styles.ViewPaidTotal}>
          <View style={styles.ViewSummarychild}>
            <TouchableOpacity>
              <Text style={styles.indexValue}>{props.totalCal.totalCase.case}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.ViewSummary}>
          <View style={styles.ViewSummarychild}>
          <Text style={styles.Titleinfo}>Tổng viếng thăm</Text>
          </View>
          <View style={styles.ViewSummarychild}>
          <Text style={styles.Titleinfo}>Tổng HD có paid</Text>
          </View>
        </TouchableOpacity>
      
        {/* <TouchableOpacity
          style={[cardStyles.container, { flex: 2.5}]}>
          <View style={[styles.row, { flex: 0.4 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
            {props.uptrails.active_staff} - {props.uptrails.active_infos.fc_name}
            </Text>
          </View>
          <View style={[styles.row, { flex: 0.4 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Danh mục tự chọn
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618, }]}>
            <View style={[styles.box]}>
              <TouchableOpacity
                onPress={() => handleShow(props.todoCal.todoCase.applIds, true)}>
                <Text style={styles.indexLabel}>Số HĐ tự chọn</Text>
                <Text style={styles.indexValueSmall} >
                  {props.todoCal.todoCase.case}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.box]}>
              <TouchableOpacity
                onPress={() => handleShow(props.todoCal.todoFollowed.applIds, true)}>
                <Text style={styles.indexLabel}>HĐ đã viếng thăm</Text>
                <Text style={styles.indexValueSmall} >
                  {props.todoCal.todoFollowed.case}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row, { flex: 0.4 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              chi tiết
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618, }]}>
            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoPaid.applIds, true)}>
              <Text style={styles.indexLabel}>
                <Ionicons name='ios-checkmark-circle' style={[styles.logo, { color: colors.green }]} />
              HĐ đã thu
            </Text>
              <Text style={styles.indexValueSmall} >
                {props.todoCal.todoPaid.case}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoPtp.applIds, true)}>
              <Text style={styles.indexLabel}>
                <Ionicons name='ios-heart' style={[styles.logo, { color: colors.green }]} />
              PTP
            </Text>
              <Text style={styles.indexValueSmall} >
                {props.todoCal.todoPtp.case}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoBptp.applIds, true)}>
              <Text style={styles.indexLabel}>
                <Ionicons name='ios-close-circle' style={[styles.logo, { color: colors.secondary }]} />
              Hủy-PTP
            </Text>
              <Text style={styles.indexValueSmall} >
                {props.todoCal.todoBptp.case}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[cardStyles.container, styles.box]}
              onPress={() => handleShow(props.todoCal.todoRevisit.applIds, true)}>
              <Text style={styles.indexLabel}>
                <Ionicons name='ios-cash' style={[styles.logo, { color: colors.secondary }]} />
              Thăm lại
            </Text>
              <Text style={styles.indexValueSmall} >
                {props.todoCal.todoRevisit.case}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={[cardStyles.container, { flex: 1.328 }]} >
          <View style={[styles.row, { flex: 0.5 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Thông tin danh mục
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618 }]}>
            <View style={[styles.box]}>
              <TouchableOpacity
                style={[cardStyles.container, styles.box]}
                onPress={() => handleShow(props.totalCal.totalCase.applIds, false)}>
                <Text style={styles.indexLabel}>Tổng số HĐ</Text>
                <Text
                  style={styles.indexValue}
                >{props.totalCal.totalCase.case}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.box]}>
              <TouchableOpacity
                style={[cardStyles.container, styles.box]}
                onPress={() => handleShow(props.treeCal[1].applIds, true)}>
                <Text style={styles.indexLabel}>Đã viếng thăm</Text>
                <Text
                  style={styles.indexValue}
                >{props.treeCal[1].case}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.box]}>
              <TouchableOpacity
                style={[cardStyles.container, styles.box]}
                onPress={() => handleShow(props.totalCal.ptpCase.applIds, true)}>
                <Text style={styles.indexLabel}>PTP</Text>
                <Text
                  style={styles.indexValue}
                >{props.totalCal.ptpCase.case}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[cardStyles.container, { flex: 1 }]}
          onPress={() => handleShow(props.totalCal.paidAll.applIds, true)}>
          <View style={[styles.row, { flex: 0.618 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Tổng số thu trong tháng
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618 }]}>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>HĐ đã thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{props.totalCal.paidMtd.case}
              </Text>
            </View>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>Số tiền thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{moneyFormat(props.totalCal.paidMtd.value)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[cardStyles.container, { flex: 1 }]}
          onPress={() => handleShow(props.totalCal.paidToday.applIds, true)}>
          <View style={[styles.row, { flex: 0.618 }]}>
            <Text style={[cardStyles.Text, { color: colors.lightGray }]}>
              Tổng số thu trong ngày
            </Text>
          </View>
          <View style={[styles.row, { flex: 1.618 }]}>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>HĐ đã thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{props.totalCal.paidToday.case}
              </Text>
            </View>
            <View style={[styles.box]}>
              <Text style={styles.indexLabel}>Số tiền thu</Text>
              <Text
                style={[styles.indexValueSmall, { color: colors.green }]}
              >{moneyFormat(props.totalCal.paidToday.value)}
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
      <View style={{ flex: 0.138}}>
      </View>
    </View>
  )
}

const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 13,
    margin: 5,
    padding: 5,
    shadowColor: colors.white,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 24,
  },
  wrapper: {
    flex: 0.5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  icon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 0.7,
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: '#3FE77B',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    color: '#FFF',
    fontSize: 12,
    letterSpacing: 0.29,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  subText: {
    color: '#B1BCFD',
    fontSize: 10,
    letterSpacing: 0.29,
    paddingTop: 5,
  },

})

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.data.fetching,
    data: state.data.data,
    showlists: state.showlists.applIds,
    todoCal: state.todoCal,
    totalCal: state.totalCal,
    treeCal: state.treeCal,
    uptrails: state.uptrails,
    token: state.token.token.access,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
    setTodoShowlist: (content) => {
      dispatch(actSetTodoShowlist(content))
    },
    setActiveStaff: (content) => {
      dispatch(actSetActiveStaff(content))
    },
    initDashboard: () => {
      dispatch(actInitDashboard())
    },
    getUptrails: (config) => {
      dispatch(actGetUptrails(config))
    },
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  ViewSummary:{
    height: 100,
    width: '95%',
    borderRadius: 10,
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:150,
    top:-50,
    flexDirection:'row',
    backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ViewSummarychild:{
    height:'95%',
    width:'45%',
    marginLeft:'5%',
    paddingLeft:5,
    paddingRight:5,
    fontSize:10
  },
  ViewPaidTotal:{
    height:170,
    width:'100%',
    backgroundColor:colors.primary,
    flexDirection:'row',
  },
  Titleinfo:{
    fontSize:14
  },
  indexValue: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 50,
    paddingTop: 2,
    color: colors.light,
  },
  indexValueSmall: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 50,
    paddingTop: 2,
    color: colors.black
  },
  indexLabel: {
    textAlign: 'center', // <-- the magic
    fontSize: 10,
    paddingBottom: 2,
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

