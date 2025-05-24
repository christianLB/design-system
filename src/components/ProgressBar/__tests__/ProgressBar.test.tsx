import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar Component', () => {
  it('renders with default props', () => {
    render(<ProgressBar value={50} />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('clamps value between 0 and maxValue', () => {
    render(<ProgressBar value={150} maxValue={100} />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByText('100%')).toBeInTheDocument();
    
    // Test negative value
    render(<ProgressBar value={-10} />);
    
    const progressbarNegative = screen.getAllByRole('progressbar')[1];
    expect(progressbarNegative).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders with custom maxValue', () => {
    render(<ProgressBar value={25} maxValue={50} />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<ProgressBar value={50} variant="primary" />);
    
    // Test primary variant
    let progressbar = screen.getByRole('progressbar');
    const progressBarContainer = progressbar.querySelector('div');
    const track = progressBarContainer?.querySelector('div');
    const indicator = track?.querySelector('div'); 
    expect(indicator).toHaveClass('bg-primary');
    
    // Test success variant
    rerender(<ProgressBar value={50} variant="success" />);
    progressbar = screen.getByRole('progressbar');
    const successTrack = progressbar.querySelector('div')?.querySelector('div');
    const successIndicator = successTrack?.querySelector('div');
    expect(successIndicator).toHaveClass('bg-success');
    
    // Test warning variant
    rerender(<ProgressBar value={50} variant="warning" />);
    progressbar = screen.getByRole('progressbar');
    const warningTrack = progressbar.querySelector('div')?.querySelector('div');
    const warningIndicator = warningTrack?.querySelector('div');
    expect(warningIndicator).toHaveClass('bg-warning');
    
    // Test danger variant
    rerender(<ProgressBar value={50} variant="danger" />);
    progressbar = screen.getByRole('progressbar');
    const dangerTrack = progressbar.querySelector('div')?.querySelector('div');
    const dangerIndicator = dangerTrack?.querySelector('div');
    expect(dangerIndicator).toHaveClass('bg-destructive');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<ProgressBar value={50} size="sm" />);
    
    // Test small size
    let progressbar = screen.getByRole('progressbar');
    const progressBarContainer = progressbar.querySelector('div');
    const track = progressBarContainer?.querySelector('div');
    expect(track).toHaveClass('h-1.5');
    
    // Test medium size
    rerender(<ProgressBar value={50} size="md" />);
    progressbar = screen.getByRole('progressbar');
    const mdContainer = progressbar.querySelector('div');
    const mdTrack = mdContainer?.querySelector('div');
    expect(mdTrack).toHaveClass('h-2.5');
    
    // Test large size
    rerender(<ProgressBar value={50} size="lg" />);
    progressbar = screen.getByRole('progressbar');
    const lgContainer = progressbar.querySelector('div');
    const lgTrack = lgContainer?.querySelector('div');
    expect(lgTrack).toHaveClass('h-4');
  });

  it('handles showLabel prop', () => {
    const { rerender } = render(<ProgressBar value={50} showLabel={false} />);
    
    // Test with label hidden
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
    
    // Test with label shown
    rerender(<ProgressBar value={50} showLabel={true} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('handles custom label format', () => {
    render(
      <ProgressBar 
        value={50} 
        labelFormat={(value) => `${value} of 100 complete`} 
      />
    );
    
    expect(screen.getByText('50 of 100 complete')).toBeInTheDocument();
  });

  it('renders indeterminate state correctly', () => {
    render(<ProgressBar isIndeterminate />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).not.toHaveAttribute('aria-valuenow');
    expect(progressbar).toHaveAttribute('aria-valuetext', 'Loading...');
    
    const progressBarContainer = progressbar.querySelector('div');
    const track = progressBarContainer?.querySelector('div');
    const indicator = track?.querySelector('div');
    expect(indicator).toHaveClass('progress-bar-indeterminate');
    
    // Should show "Loading..." text
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProgressBar value={50} className="custom-class" />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('custom-class');
  });
});
