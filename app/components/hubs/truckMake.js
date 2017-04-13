import React, {
  Component,
  View,
	Text,
  ActivityIndicatorIOS
} from 'react-native';
import { connect } from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from '../../selectors'
import styles from '../../styles'

import GeneralButton from '../buttons/generalButton'
import Loading from '../ui/loading'

import { setActiveFilterValue, fetchFilters } from '../../actions/filters'

const FILTERIDX=3
const NEXT_FILTER_PATH = '/hub-selection/axle-type'


class TruckMake extends Component {
  componentDidMount() {

		const { dispatch, app, fetchFilter} = this.props
		fetchFilter(FILTERIDX, app)

	}
  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, app, goBack} = nextProps

		if (app.goingBack == true && app.currentIndex === FILTERIDX && app.filterResults[FILTERIDX].length === 0) {
      goBack(app)
      return false;
    }
    return true;
  }
	render() {
		const {app, setFilter} = this.props
    if (app.isFetching) {
      return (
        <Loading
					isFetching={app.isFetching}
					viewStyle={styles.main.containerWithNav}
					buttonStyle={[styles.main.centering, styles.main.loading]}
					/>
      )
    }
		return(
      <View style={styles.main.containerWithNav} >
        <Text allowFontScaling={false} style={styles.main.subHead}>Truck Make</Text>
        <View style={styles.main.twoColumns}>
          {app.filterResults[FILTERIDX].map((result, index) => {
          return (<GeneralButton
						style={styles.buttons.generalHorizontal}
						onPress={()=> { setFilter(FILTERIDX, {tmake: result.Id}, app)}}
						mainText={result.Name}
            key={index}
					/>)
        })}
      </View>
      </View>

			)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TruckMake);
