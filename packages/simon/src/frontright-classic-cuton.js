import { addButtons } from './shared'

export default (part) => {
  const { store, utils, sa, Point, points, Path, paths, complete, paperless, macro, options } =
    part.shorthand()

  const width = store.get('buttonPlacketWidth')
  points.placketTopIn = utils.lineIntersectsCurve(
    new Point(width / -2, points.cfNeck.y + 20),
    new Point(width / -2, points.cfNeck.y - 20),
    points.cfNeck,
    points.cfNeckCp1,
    points.neckCp2Front,
    points.neck
  )
  points.placketTopOut = points.cfNeck.shift(0, width / 2)
  points.placketTopEdge = points.cfNeck.shift(0, width * 1.5)
  points.placketBottomIn = points.cfHem.shift(180, width / 2)
  points.placketBottomOut = points.cfHem.shift(0, width / 2)
  points.placketBottomEdge = points.cfHem.shift(0, width * 1.5)

  const buttonholePlacketWidth = store.get('buttonholePlacketWidth')
  if (options.buttonholePlacketStyle === 'seamless') {
    points.placketTopMatch = points.cfNeck.shift(180, buttonholePlacketWidth / 2)
    points.placketBottomMatch = points.cfHem.shift(180, buttonholePlacketWidth / 2)
  } else {
    const fold = store.get('buttonholePlacketFoldWidth')
    points.placketTopMatch = points.cfNeck.shift(180, buttonholePlacketWidth / 2 - fold)
    points.placketBottomMatch = points.cfHem.shift(180, buttonholePlacketWidth / 2 - fold)
  }

  paths.seam.line(points.placketTopEdge).line(points.placketBottomEdge).line(points.cfHem).close()

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path().move(points.cfNeck).line(points.cfHem).attr('class', 'help')
    paths.placketOuterFold = new Path()
      .move(points.placketTopOut)
      .line(points.placketBottomOut)
      .attr('class', 'dotted')
    paths.placketInnerFold = new Path()
      .move(points.placketBottomIn)
      .line(points.placketTopIn)
      .attr('class', 'dotted')
    if (!options.seperateButtonholePlacket) {
      // Match lines are only displayed on attached plackets
      if (Math.abs(points.placketTopIn.x - points.placketTopMatch.x) < 0.5) {
        // Match line is nearly the same as the inner fold line.
        paths.placketInnerFold
          .attr('data-text', 'matchHere')
          .attr('data-text-class', 'text-xs center')
      } else {
        // Separate match line and inner fold line.
        paths.placketMatch = new Path()
          .move(points.placketBottomMatch)
          .line(points.placketTopMatch)
          .attr('class', 'stroke-sm help')
          .attr('data-text', 'matchHere')
          .attr('data-text-class', 'text-xs center')
      }
    }
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'cfNeck',
        'cfHem',
      ],
    })

    // Buttons
    addButtons(part)

    // Title
    macro('title', { at: points.title, nr: 1, title: 'frontRight' })

    if (sa) {
      paths.saFromArmhole
        .line(new Point(points.placketTopEdge.x + sa, points.placketTopEdge.y - sa))
        .line(new Point(points.placketBottomEdge.x + sa, points.placketBottomEdge.y + sa * 3))
        .line(paths.hemSa.start())
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.placketTopOut,
      to: points.placketTopEdge,
      y: points.placketTopEdge.y - 15 - sa,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.placketTopEdge,
      y: points.placketTopEdge.y - 30 - sa,
    })
    macro('hd', {
      from: points.placketTopIn,
      to: points.placketTopEdge,
      y: points.placketTopEdge.y - 45 - sa,
    })
    macro('hd', {
      from: points.s3CollarSplit,
      to: points.placketTopEdge,
      y: points.s3CollarSplit.y - 15 - sa,
    })
    macro('hd', {
      from: points.s3ArmholeSplit,
      to: points.placketTopEdge,
      y: points.s3CollarSplit.y - 30 - sa,
    })
    macro('hd', {
      from: points.armhole,
      to: points.placketTopEdge,
      y: points.s3CollarSplit.y - 45 - sa,
    })
    if (complete) {
      points.button0 = points.placketTopEdge
      let j
      for (let i = 0; i < options.buttons; i++) {
        j = i + 1
        macro('vd', {
          from: points['button' + j],
          to: points['button' + i],
          x: points.placketTopEdge.x + 15 + sa,
        })
      }
    }
    macro('vd', {
      from: points.placketBottomEdge,
      to: points.placketTopEdge,
      x: points.placketTopEdge.x + 30 + sa,
    })
  }

  return part
}
