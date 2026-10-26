import clsx from 'clsx';
import styles from './Container.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'header' | 'footer' | 'article';
  size?: 'default' | 'narrow';
}

export function Container({ as: Tag = 'div', size = 'default', className, ...rest }: ContainerProps) {
  return <Tag className={clsx(styles.container, size === 'narrow' && styles.narrow, className)} {...rest} />;
}
