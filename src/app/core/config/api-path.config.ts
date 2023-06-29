export const ApiPathConfig = {
    pages: {
        tourism: 'tourism',
        resort: 'resort',
        service: 'service',
        favourite: 'favourite',
        trip: 'trip',
        post: 'post',

        // Review
        review: 'review',
        write_review_tourism: 'review/write/tourism',
        write_review_resort: 'review/write/resort',
    },
    common: {
        category: 'category'
    }, 
    auth: {
        account: 'account',
        auth_account: 'account/me',
        auth_favourite: 'account/me/favourites',
        auth_trip: 'account/me/trips',
        login: 'account/login',
        register: 'account/register',
        update: 'account/update/info',
        change_pass: 'account/update/password',
        tourism_by_account: 'account/tourisms',
        resort_by_account: 'account/resorts',
        service_by_account: 'account/services'
    },
    model: {
        text_classify: 'review/classify'
    }
}