import React from 'react';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../core/firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            this.props.dispatch(updateCollections(collectionsMap));

            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    render() {
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={this.state.loading} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={this.state.loading} {...props} />} />
            </div>
        );
    }

}

export default connect()(ShopPage);