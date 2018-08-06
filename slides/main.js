const bespoke = require('bespoke');
const bespokeKeys = require('bespoke-keys');
const bespokeVcr = require('bespoke-vcr');

bespoke
  .from('body', [
    bespokeKeys('vertical'),
    bespokeVcr({
      recording: createTimeline([1, 5, 5, 10, 5, 5, 10, 20, 5]),
    }),
  ])
  .on('activate', ({ slide }) => {
    slide.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });

    return false;
  });

function createTimeline(timeouts) {
  return timeouts.reduce(
    (timeline, timeout, index) => [
      ...timeline,
      {
        command: 'slide',
        arguments: [index + 1],
        timeout:
          timeline[timeline.length - 1].timeout + toMilliseconds(timeout),
      },
    ],
    [{ timeout: 0 }]
  );
}

function toMilliseconds(minutes) {
  return minutes * 60 * 1000;
}
