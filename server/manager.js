module.exports = function ( mongourl ) {

  var DB = require( './lib/data.js' )( mongourl );

  var Coll = function ( collname ) {
    return {
      'insert': function ( item, callback ) {
        DB.insert( collname, item, callback );
      },
      'update': function ( query, modifier, callback ) {
        DB.update( collname, query, modifier, callback );
      },
      'remove': function ( query, callback ) {
        DB.remove( collname, query, callback );
      },
      'findOne': function ( query, callback ) {
        DB.findOne( collname, query, callback );
      },
      'find': function ( query, callback ) {
        DB.find( collname, query, callback );
      },
    }
  }

  return {
    'User': Coll( 'user' )
  };

};
