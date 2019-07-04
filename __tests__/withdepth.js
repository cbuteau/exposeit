
var createComplexDepth = function createComplex() {
  return {
    flags: {
      proChoice: true,
      proGovt: true,
      proHillary: true
    },
    callbacks: {
      onComplete: function() {},
      onError: function() {},
      onSpecial: function(){}
    }
  }
};

var compDefDepth = {
  flags: {
    proChoice: false,
    proGovt: false
  },
  callbacks: {
    onComplete: function() {},
    onError: function() {},
  }
}

describe('Exposure exposes nested interface exposure', function() {
  it ('Complex One', function() {
    var proxy = exposeit(createComplexDepth(), compDefDepth);
    expect(proxy.flags).not.toBeUndefined();
    expect(proxy.flags.proChoice).toBe(true);
    expect(proxy.flags.proGovt).toBe(true);
    expect(proxy.flags.proHillary).toBeUndefined(true);

    expect(proxy.callbacks.onComplete).not.toBeUndefined();
    expect(proxy.callbacks.onError).not.toBeUndefined();
    expect(proxy.callbacks.onSpecial).toBeUndefined();
  });
});
