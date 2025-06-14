import React, { type CSSProperties } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const tableVariants = cva(cn('table [&_tr]:border-0'), {
  variants: {
    size: {
      xs: 'table-xs',
      sm: 'table-sm',
      md: 'table-md',
      lg: 'table-lg',
      xl: 'table-xl'
    }
  },
  defaultVariants: {
    size: 'lg'
  }
})

export interface TableColumn<D extends object, K = keyof D> {
  name: React.ReactNode
  field: K
  align?: CSSProperties['textAlign']
  width?: CSSProperties['width']
  render?: (value: D[keyof D], data: D) => React.ReactNode
}

export interface TableProps<D extends object>
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  columns: TableColumn<D>[]
  dataSource: D[]
  rowKey?: keyof D | ((data: D, index: number) => string)
  bodyClassName?: React.HTMLAttributes<HTMLTableSectionElement>['className']
}

export const Table = <D extends object>({
  className,
  size,
  columns,
  dataSource,
  rowKey = 'id' as keyof D,
  bodyClassName,
  ...rest
}: TableProps<D>) => {
  return (
    <table {...rest} className={tableVariants({ className, size })}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field.toString()} style={{ textAlign: column.align, width: column.width }}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={bodyClassName}>
        {dataSource.map((data, index) => (
          <tr key={typeof rowKey === 'function' ? rowKey(data, index) : String(data[rowKey])}>
            {columns.map((column) => (
              <td key={column.field.toString()} style={{ textAlign: column.align, width: column.width }}>
                {column.render?.(data[column.field], data) || (data[column.field] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
