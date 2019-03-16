export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  // Double back vent
  if (options.backVent === 2) {
    let ventY = points.bsHips.y - points.bsWaistCp2.dy(points.bsHips) * options.backVentLength;
    // Vent tip
    points.ventStart = utils.curveIntersectsY(
      points.bsHips,
      points.bsHipsCp2,
      points.bsWaistCp1,
      points.bsWaist,
      ventY
    );
    paths.ventBase = new Path()
      .move(points.bsWaist)
      .curve(points.bsWaistCp1, points.bsHipsCp2, points.bsHips)
      .split(points.ventStart)
      .pop()
      .line(points.bsHem);
    paths.vent = paths.ventBase.offset(measurements.neckCircumference / -10);
    //paths.vent.render = false;
    points.ventSlopeStart = utils.lineIntersectsCurve(
      paths.vent.start(),
      paths.vent.start().shift(170, measurements.neckCircumference / 5),
      points.bsHips,
      points.bsHipsCp2,
      points.bsWaistCp1,
      points.bsWaist
    );
    // Mirror slope on vent
    points.ventHem = utils.beamIntersectsX(
      points.sideHem,
      paths.vent.end(),
      paths.vent.end().flipX(points.bsHem).x
    ).flipX(points.bsHem);
  }

  // Clean up - Remove this to understand what's going on
  for (let i of Object.keys(paths))
    if(i !== "vent") delete paths[i];
  for (let i of Object.keys(snippets)) delete snippets[i];

  // Paths
  paths.hemBase = new Path()
    .move(points.sideHem)
    .line(points.bsHem);
  if (options.backVent === 2) {
    paths.hemBase
      .line(points.ventHem)
      .line(paths.vent.end());
    paths.saBase = paths.vent.clone()
      .reverse()
      .line(points.ventSlopeStart)
      .join(new Path()
        .move(points.bsHips)
        .curve(points.bsHipsCp2, points.bsWaistCp1, points.bsWaist)
        .split(points.ventSlopeStart)
        .pop()
      );
  } else {
    paths.saBase = new Path()
      .move(points.bsHem)
      .line(points.bsHips)
      .curve(points.bsHipsCp2, points.bsWaistCp1, points.bsWaist);
  }
  paths.saBase = paths.saBase
    .curve_(points.bsWaistCp2, points.bsArmholeHollow)
    .curve(points.bsArmholeHollowCp1, points.bsArmholeCp2, points.sideArmhole)
    .curve(points.sideArmholeCp2, points.sideSplitCp1, points.fsArmhole)
    ._curve(points.sideWaistCp2, points.sideWaist)
    .curve(points.sideWaistCp1, points.sideHipsCp2, points.sideHips)
    .line(points.sideHem)

  paths.seam = paths.saBase
    .clone()
    .join(paths.hemBase)
    .close()
    .attr("class", "fabric");

  return part;
}
