exports.tsCycleEnvToPSCycleEnv_ = just => nothing => cycleEnv => ({
  weight: cycleEnv.weight,
  tag: cycleEnv.tag === undefined ? nothing : just(cycleEnv.tag),
});

exports.psCycleEnvToTSCycleEnv = weight => tag => {
  var out = { weight: weight };
  if (tag.just) {
    out.tag = tag.just;
  }
  return out;
};
