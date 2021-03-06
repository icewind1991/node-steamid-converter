var steam = require('../index.js')()
  , assert = require('assert')
  , api = require('./config.json').api

describe('steamidconvert', function() {
  describe('.convertTo64(sid)', function() {
    it('should convert steamid to steamid64', function() {
      var res = steam.convertTo64('STEAM_0:1:82174')
      assert(res === '76561197960430077')
    })
    it('should have an argument', function() {
      assert.throws(steam.convertTo64, /SteamID argument required/)
    })
    it('should be a string', function() {
      assert.throws(function() {
        steam.convertTo64(1)
      }, 
        /SteamID must be a string/
      )
    })
    it('should be a valid steamid', function() {
      assert.throws(function() {
        steam.convertTo64('1')
      }, 
        /Invalid SteamID/
      )
      assert.throws(function() {
        steam.convertTo64('STEAM_0:1')
      }, 
        /Invalid SteamID/
      )
      assert.throws(function() {
        steam.convertTo64('STEAM_1:112345')
      }, 
        /Invalid SteamID/
      )
    })
    it('should convert account id with brackets to steamid64', function () {
      var res = steam.convertTo64('[U:1:64229260]')
      assert.equal('76561198024494988', res)
    })
    it('should convert account id without brackets to steamid64', function () {
      var res = steam.convertTo64('U:1:64229260')
      assert.equal('76561198024494988', res)
    })
  })

  describe('.convertToText(sid64)', function() {
    it('should convert steamid64 to steamid', function() {
      var res = steam.convertToText('76561197960430077')
      assert(res === 'STEAM_0:1:82174')
    })
    it('should have an argument', function() {
      assert.throws(steam.convertToText, /SteamID64 argument required/)
    })
    it('should be a string', function() {
      assert.throws(function() {
        steam.convertToText(1)
      }, 
        /SteamID must be a string/
      )
    })
    it('should be a valid steamid64', function() {
      assert.throws(function() {
        steam.convertToText('1')
      }, 
        /Invalid SteamID/
      )
      assert.throws(function() {
        steam.convertToText('92830129381029')
      }, 
        /Invalid SteamID/
      )
    })
    it('should convert account id to steam id', function () {
      var res = steam.convertToText('[U:1:64229260]')
      assert.equal('STEAM_0:0:32114630', res)
    })
  })

  describe('.convertVanity(base)', function() {
    it('should have an api key', function(done) {
      steam.convertVanity('panvertigo', function(err, res) {
        assert(err.message === 'Invalid key')
        done()
      })
    })
    it('should have a callback', function() {
      assert.throws(function() {
        steam.convertVanity('panvertigo', null)
      },
        /Callback required/
      )
    })
  })
  describe('.convertVanity(base)', function() {
    before(function() {
      steam = require('../index.js')(api)
    })
    it('should convert vanity URL to steamid64', function(done) {
      steam.convertVanity('panvertigo', function(err, res) {
        assert(res === '76561198000670105')
        done()
      })
    })
  })

  describe('.convertToNewFormat(sid)', function() {
    it('should convert old steamid to new steamid format', function() {
      var res = steam.convertToNewFormat('STEAM_0:1:82174')
      assert(res === '[U:1:164349]')
    })
    it('should have an argument', function() {
      assert.throws(steam.convertToNewFormat, /SteamID argument required/)
    })
    it('should be a string', function() {
      assert.throws(function() {
        steam.convertToNewFormat(1)
      }, 
        /SteamID must be a string/
      )
    })
    it('should be a valid steamid', function() {
      assert.throws(function() {
        steam.convertToNewFormat('1')
      }, 
        /Invalid SteamID/
      )
      assert.throws(function() {
        steam.convertToNewFormat('STEAM_0:1')
      }, 
        /Invalid SteamID/
      )
      assert.throws(function() {
        steam.convertToNewFormat('STEAM_1:112345')
      }, 
        /Invalid SteamID/
      )
    })
  })
})
