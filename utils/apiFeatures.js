class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString
  }


  filter() {

    const queryObject = { ...this.queryString }
    const excludedField = ['page', 'sort', 'limit', 'fields'];
    excludedField.forEach(el => delete queryObject[el])

    //ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))

    return this;

  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      console.log(sortBy);
      this.query = this.query.sort(sortBy)
    }
    else {
      this.query.sort('-_id')
    }
    return this;
  }

  limitFields() {
    //3) Field Limiting (Projecting)

    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    else {
      this.query = this.query.select('-__v');
    }
    return this;



    //4 PAGINATION



  }

  paginate() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit


    this.query = this.query.skip(skip).limit(limit)

    return this;
  }
}


module.exports = APIFeatures;