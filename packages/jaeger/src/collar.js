/*
 * FIXME
 *
 * This collar was ported as-is from the original (PHP) design
 * I did a few years ago. I think it would benefit from a redesign
 * but I find collar design to be rather tricky business and
 * would love the input from someone with more pattern design
 * experience, or more tailoring exprience.
 */

export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  // Add extra fabric for collar roll
  points.collarCbTopRoll = points.collarCbTop.shift(-90, options.collarRoll);
  points.collarCbTopCpRoll = points.collarCbTopCp.shift(-90, options.collarRoll);
  points.notchTipRoll = points.notch.shiftOutwards(points.notchTip, options.collarRoll);

  // Mirror to create left half
  let mirror = [
    "collarstandCbTopCp",
    "collarstandTip",
    "notch",
    "notchTip",
    "collarCbTopCp",
    "notchTipRoll",
    "collarCbTopCpRoll",
  ];
  for (let i of mirror) points[i+"Left"] = points[i].flipX(points.collarCbTop);


  paths.seam = new Path()
    .move(points.collarstandCbTop)
    .curve_(points.collarstandCbTopCpLeft, points.collarstandTipLeft)
    .line(points.notchLeft)
    .line(points.notchTipRollLeft)
    ._curve(points.collarCbTopCpRollLeft, points.collarCbTopRoll)
    .curve_(points.collarCbTopCpRoll, points.notchTipRoll)
    .line(points.notch)
    .line(points.collarstandTip)
    ._curve(points.collarstandCbTopCp, points.collarstandCbTop)
    .close()
    .attr("class", "fabric");

  paths.roll = new Path()
    .move(points.notchTip)
    ._curve(points.collarCbTopCp, points.collarCbTop)
    .curve_(points.collarCbTopCpLeft, points.notchTipLeft)
    .attr("class", "stroke-sm dashed");

  return part;
}
