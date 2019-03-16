export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  // Front closure overlap
  points.neckEdge = points.cfNeck.shift(180, measurements.chestCircumference * options.frontOverlap);
  points.hemEdge = new Point(
    points.neckEdge.x,
    points.cfHem.y
  );

  // Chest pocket
  points.chestPocketAnchor = new Point(
    points.split.x * options.chestPocketPlacement,
    points.armholePitchCp1.y
  );
  let width = points.split.x * options.chestPocketWidth;
  let height = width * options.chestPocketWeltSize;

  points.chestPocketTop = points.chestPocketAnchor.shift(90, height/2);
  points.chestPocketBottom = points.chestPocketAnchor.shift(-90, height/2);
  points.chestPocketTopLeft = points.chestPocketTop.shift(180 + options.chestPocketAngle, width/2);
  points.chestPocketTopRight = points.chestPocketTopLeft.rotate(180, points.chestPocketTop);
  points.chestPocketBottomLeft = points.chestPocketBottom.shift(180 + options.chestPocketAngle, width/2);
  points.chestPocketBottomRight = points.chestPocketBottomLeft.rotate(180, points.chestPocketBottom);
  store.set("chestPocketWidth", width);
  store.set("chestPocketWeltHeight", height);

  // Inner pocket
  points.innerPocketAnchor = new Point(
    points.hips.x * options.innerPocketPlacement,
    points.dartTop.y
  );
  width = points.hips.x * options.innerPocketWidth;
  let weltHeight = width * options.innerPocketWeltHeight;
  points.innerPocketTop = points.innerPocketAnchor.shift(90, weltHeight);
  points.innerPocketBottom = points.innerPocketAnchor.shift(-90, weltHeight);
  points.innerPocketLeft = points.innerPocketAnchor.shift(180, width/2);
  points.innerPocketRight = points.innerPocketLeft.flipX(points.innerPocketAnchor);
  points.innerPocketTopLeft = points.innerPocketLeft.shift(90, weltHeight);
  points.innerPocketTopRight = points.innerPocketTopLeft.flipX(points.innerPocketAnchor);
  points.innerPocketBottomLeft = points.innerPocketLeft.shift(-90, weltHeight);
  points.innerPocketBottomRight = points.innerPocketBottomLeft.flipX(points.innerPocketAnchor);
  store.set("innerPocketWeltHeight", weltHeight);
  store.set("innerPocketWidth", width);

  // Slash & spread chest. This is one of those things that's simpler on paper
  points.splitEdge = new Point(
    points.neckEdge.x,
    points.split.y
  );

  let rotate = [
    "splitEdge",
    "neckEdge",
    "cfNeck",
    "cfNeckCp1",
    "neckCp2Front",
    "neck",
    "shoulder",
    "shoulderCp1",
    "armholePitchCp2",
    "armholePitch",
    "armholePitchCp1",
    "armholeHollowCp2",
    "armholeHollow",
    "armholeHollowCp1",
    "splitCp2",
    "frontNeckCpEdge"
  ];
  for (let p of rotate) {
    points[p] = points[p].rotate(options.chestShapingMax * options.chestShaping * -1, points.split);
  }

  // Lapel break point and cutaway point
  points.lapelBreakPoint = new Point(
    points.hemEdge.x,
    points.dartTop.y * (1 + options.lapelBreak)
  );
  points.cutawayPoint = points.lapelBreakPoint.shift(
    -90,
    points.lapelBreakPoint.dy(points.hemEdge) * options.buttonLength
  );

  // Lapel roll line
  let rollHeight = measurements.neckCircumference * options.rollLineCollarHeight;
  points.shoulderRoll = points.shoulder.shiftOutwards(points.neck, rollHeight);
  let collarHeight = measurements.neckCircumference * options.collarHeight;
  points.shoulderRollCb = points.lapelBreakPoint.shiftOutwards(points.shoulderRoll, store.get("backCollarLength"));
  let angle = points.shoulderRoll.angle(points.shoulderRollCb);
  points.collarCbHelp = points.shoulderRollCb.shift(angle-90, rollHeight);
  points.collarCbBottom = points.collarCbHelp.shift(angle-90, rollHeight);
  points.collarCbTop = points.collarCbHelp.shift(angle+90, collarHeight * 2 - rollHeight);

  // Notch
  points.notchMax = utils.beamsIntersect(
    points.lapelBreakPoint, points.shoulderRoll,
    points.neckEdge, points.frontNeckCpEdge
  );
  points.lapelTip = utils.beamsIntersect( // Keeps lapel straight despite chest shaping
    points.hemEdge, points.lapelBreakPoint,
    points.notchMax, points.cfNeckCp1
  );
  points.notchEdge = points.lapelTip.shiftFractionTowards(points.notchMax, options.lapelReduction);
  points.notch = points.cfNeck.shiftFractionTowards(points.notchMax, options.collarNotchDepth);
  points.notchTip = points.neckEdge.rotate(options.collarNotchAngle * -1, points.notch);
  points.notchTip = points.notch.shiftFractionTowards(points.notchTip, options.collarNotchReturn);
  points.notchTipCp = points.notchTip.shift(points.notch.angle(points.notchTip)-90, points.notchTip.dist(points.collarCbTop)/4);
  points.collarCbTopCp = points.collarCbTop.shift(points.collarCbBottom.angle(points.collarCbTop)+90, points.notchTip.dist(points.collarCbTop)/4);

  // Redraw front neck line
  points.lapelStraightEnd = new Point(
    points.lapelBreakPoint.x,
    points.splitEdge.y
  );
  points.lapelStraightEndCp1 = points.lapelStraightEnd.shift(90, points.neckEdge.dy(points.lapelStraightEnd) * 0.7);
  angle = points.notch.angle(points.neck);
  points._dir1 = points.notch.shift(angle/2, 50);
  points._dir2 = points.neck.shift(angle * 1.5 + 180, 50);
  points.collarCorner = points.notch.shiftFractionTowards(points.notchMax, 1.6)

  // Cut rollline back to collar line
  let shoulderRoll = utils.linesIntersect(
    points.shoulderRoll, points.lapelBreakPoint,
    points.notch, points.collarCorner
  );
  // FIXME: Does this ever happen?
  if(!shoulderRoll) throw new Error("Roll line does not intersect with notch/collarCorner line");
  else points.shoulderRoll = shoulderRoll;

  // Round the hem
  points.hemRoundTarget = new Point(
    points.hem.x,
    points.cfHem.y
  );
  points.roundStart = points.cutawayPoint
    .shiftFractionTowards(points.hemEdge, options.frontCutawayStart)
    .rotate(options.frontCutawayAngle, points.cutawayPoint);
  points.roundEnd = points.hemDropEnd.shiftFractionTowards(points.cfHem, 1 - options.frontCutawayEnd);
  points.roundVia = utils.beamsIntersect(
    points.cutawayPoint, points.roundStart,
    points.hemDropEnd, points.cfHem
  );
  points.roundCp1 = points.roundStart.shiftFractionTowards(points.roundVia, options.hemRadius);
  points.roundCp2 = points.roundEnd.shiftFractionTowards(points.roundVia, options.hemRadius);
  let cpDist = points.cutawayPoint.dy(points.roundStart)/3;
  points.cutawayPointCp2 = points.cutawayPoint.shift(-90, cpDist);
  points.roundStartCp1 = points.roundCp1.shiftOutwards(points.roundStart, cpDist);

  // Facing/lining boundary
  points.facingTop = points.neck.shiftFractionTowards(points.shoulder, 0.2);
  points.facingBottom = new Path()
    .move(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.hem)
    .intersectsX(points.dartLeft.x * 0.7)
    .pop();

  // Inner pocket facing extension (ipfe)
  points.ipfeAnchor = utils.beamsIntersect(
    points.facingTop, points.facingBottom,
    points.innerPocketLeft, points.innerPocketRight
  );
  let ipfeHeight = points.innerPocketTopRight.dy(points.innerPocketBottomRight) * 5;
  points.ipfeTopRight = points.innerPocketRight.shift(90, ipfeHeight/2);
  points.ipfeBottomRight = points.ipfeTopRight.flipY(points.innerPocketRight);
  points.ipfeEdge = points.innerPocketRight.shift(0, ipfeHeight/2);
  points.ipfeViaTopRight = new Point(
    points.ipfeEdge.x,
    points.ipfeTopRight.y
  );
  points.ipfeViaBottomRight = points.ipfeViaTopRight.flipY(points.innerPocketRight);
  macro("round", {
    from: points.ipfeBottomRight,
    to: points.ipfeEdge,
    via: points.ipfeViaBottomRight,
    radius: ipfeHeight/2,
    prefix: "ipfeBottomRight",
  });
  macro("round", {
    from: points.ipfeTopRight,
    to: points.ipfeEdge,
    via: points.ipfeViaTopRight,
    radius: ipfeHeight/2,
    prefix: "ipfeTopRight",
  });
  points.ipfeStart = utils.beamIntersectsY(
    points.facingTop,
    points.facingBottom,
    points.innerPocketAnchor.y - ipfeHeight
  );
  points.ipfeEnd = utils.beamIntersectsY(
    points.facingTop,
    points.facingBottom,
    points.innerPocketAnchor.y + ipfeHeight
  );
  points.ipfeStartEnd = new Point(
    points.ipfeStart.x + ipfeHeight/2,
    points.innerPocketAnchor.y - ipfeHeight/2
  );
  points.ipfeStartVia = new Point(
    points.ipfeStart.x,
    points.ipfeStartEnd.y
  );
  points.ipfeEndEnd = new Point(
    points.ipfeEnd.x + ipfeHeight/2,
    points.innerPocketAnchor.y + ipfeHeight/2
  );
  points.ipfeEndVia = new Point(
    points.ipfeEnd.x,
    points.ipfeEndEnd.y
  );
  macro("round", {
    from: points.ipfeStart,
    to: points.ipfeStartEnd,
    via: points.ipfeStartVia,
    radius: ipfeHeight/2,
    prefix: "ipfeStart",
  });
  macro("round", {
    from: points.ipfeEnd,
    to: points.ipfeEndEnd,
    via: points.ipfeEndVia,
    radius: ipfeHeight/2,
    prefix: "ipfeEnd",
  });
  // Rotate control points to smooth out curve
  angle = points.facingTop.angle(points.facingBottom) + 90;
  points.ipfeStartCp1 = points.ipfeStartCp1.rotate(angle, points.ipfeStart);
  points.ipfeEndCp1 = points.ipfeEndCp1.rotate(angle, points.ipfeEnd);


  // Clean up - Remove this and uncomment paths below to understand what's going on
  for (let i of Object.keys(paths)) delete paths[i];
  for (let i of Object.keys(snippets)) delete snippets[i];

  /*
  paths.edge = new Path()
    .move(points.neckEdge)
    .line(points.hemEdge);

  paths.slash = new Path()
    .move(points.split).line(points.splitEdge)
    .line(points.neckEdge)
    .line(points.cfNeck)
    .curve(points.frontNeckCpEdge, points.neckCp2Front, points.neck)
    .line(points.shoulder)
    .curve(points.shoulderCp1, points.armholePitchCp2, points.armholePitch)
    .curve(points.armholePitchCp1, points.armholeHollowCp2, points.armholeHollow)
    .curve(points.armholeHollowCp1, points.splitCp2, points.split)
    .attr("class", "stroke-xl lining");

  paths.collarPrep = new Path()
    .move(points.shoulderRoll)
    .line(points.shoulderRollCb)
    .line(points.collarCbHelp)
    .line(points.collarCbBottom)
    .line(points.collarCbTop)
    .line(points.notchTipCp)
    .line(points.collarCbTopCp)

  paths.sdfs = new Path()
    .move(points.cutawayPoint)
    .curve(points.cutawayPointCp2, points.roundStartCp1, points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)

  paths.brzxclx = new Path()
    .move(points.notch)
    .line(points.collarCorner)
    .line(points.neck)

  */


  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.split)
    .curve(points.splitCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .line(points.collarCorner)
    .line(points.notch)
    .line(points.notchEdge)
    ._curve(points.lapelStraightEndCp1, points.lapelStraightEnd)
    .line(points.cutawayPoint)
    .curve(points.cutawayPointCp2, points.roundStartCp1, points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd);
  paths.saBase.render = false;

  paths.hemBase = new Path()
    .move(points.roundEnd)
    .line(points.hem);
  paths.hemBase.render = false;

  paths.seam = paths.saBase
    .clone()
    .join(paths.hemBase)
    .attr("class", "fabric");

  paths.flb = new Path()
    .move(points.facingTop)
    .line(points.ipfeStartStart)
    .curve(points.ipfeStartCp1, points.ipfeStartCp2, points.ipfeStartEnd)
    .line(points.ipfeTopRightStart)
    .curve(points.ipfeTopRightCp1, points.ipfeTopRightCp2, points.ipfeTopRightEnd)
    .curve(points.ipfeBottomRightCp2, points.ipfeBottomRightCp1, points.ipfeBottomRightStart)
    .line(points.ipfeEndEnd)
    .curve(points.ipfeEndCp2, points.ipfeEndCp1, points.ipfeEnd)
    .line(points.facingBottom)
    .attr("class", "fabric")

  paths.chestPocket = new Path()
    .move(points.chestPocketTopRight)
    .line(points.chestPocketTopLeft)
    .line(points.chestPocketBottomLeft)
    .line(points.chestPocketBottomRight)
    .line(points.chestPocketTopRight)
    .close()
    .attr("class", "fabric dashed");

  paths.innerPocket = new Path()
    .move(points.innerPocketTopRight)
    .line(points.innerPocketTopLeft)
    .line(points.innerPocketBottomLeft)
    .line(points.innerPocketBottomRight)
    .line(points.innerPocketTopRight)
    .move(points.innerPocketLeft)
    .line(points.innerPocketRight)
    .close()
    .attr("class", "fabric dashed");

  paths.breakLine = new Path()
    .move(points.lapelBreakPoint)
    .line(points.shoulderRoll)
    .attr("class", "fabric lashed");

  paths.dart = new Path()
    .move(points.dartBottom)
    ._curve(points.dartRightCpBottom, points.dartRight)
    .curve_(points.dartRightCpTop, points.dartTop)
    ._curve(points.dartLeftCpTop, points.dartLeft)
    .curve_(points.dartLeftCpBottom, points.dartBottom)
    .close()
    .attr("class", "fabric");

  if (complete) {

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hemBase.offset(sa * 3))
        .close()
        .attr("class", "fabric sa");
    }
  }


  return part;
}
