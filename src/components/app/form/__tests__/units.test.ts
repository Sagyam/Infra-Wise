import { describe, expect, it } from 'vitest'
import { splitLabel, unitAdornments } from '../units'

describe('splitLabel', () => {
  it('takes a unit off the end of a label', () => {
    expect(splitLabel('Unit Cost ($)')).toEqual({
      text: 'Unit Cost',
      unit: '$',
    })
    expect(splitLabel('Salvage Value (%)')).toEqual({
      text: 'Salvage Value',
      unit: '%',
    })
    expect(splitLabel('Hot Storage Cost ($/GB/month)')).toEqual({
      text: 'Hot Storage Cost',
      unit: '$/GB/month',
    })
    expect(splitLabel('Size per HDD (TB)')).toEqual({
      text: 'Size per HDD',
      unit: 'TB',
    })
    expect(splitLabel('Fuel Consumption (L/hour)')).toEqual({
      text: 'Fuel Consumption',
      unit: 'L/hour',
    })
  })

  it('leaves a parenthesis that is part of the name', () => {
    expect(splitLabel('UPS (Uninterruptible Power Supply)')).toEqual({
      text: 'UPS (Uninterruptible Power Supply)',
    })
    expect(splitLabel('Data Transfer (Outbound)')).toEqual({
      text: 'Data Transfer (Outbound)',
    })
  })

  it('leaves a label without a unit', () => {
    expect(splitLabel('Instance Count')).toEqual({ text: 'Instance Count' })
  })
})

describe('unitAdornments', () => {
  it('puts a currency sign before the figure and the rest after', () => {
    expect(unitAdornments('$')).toEqual({ prefix: '$' })
    expect(unitAdornments('$/hour')).toEqual({ prefix: '$', suffix: '/hr' })
    expect(unitAdornments('$/GB/month')).toEqual({
      prefix: '$',
      suffix: '/GB/mo',
    })
    expect(unitAdornments('$/GB/mo')).toEqual({ prefix: '$', suffix: '/GB/mo' })
  })

  it('puts any other unit after the figure, shortened', () => {
    expect(unitAdornments('%')).toEqual({ suffix: '%' })
    expect(unitAdornments('%/year')).toEqual({ suffix: '%/yr' })
    expect(unitAdornments('Watts')).toEqual({ suffix: 'W' })
    expect(unitAdornments('TB/month')).toEqual({ suffix: 'TB/mo' })
    expect(unitAdornments('Years')).toEqual({ suffix: 'yrs' })
  })

  it('adds nothing without a unit', () => {
    expect(unitAdornments(undefined)).toEqual({})
  })
})
