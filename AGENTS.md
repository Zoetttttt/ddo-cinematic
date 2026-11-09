# Design edition preservation

The user requires every previous edition to keep a permanent access link.

- Dated directories under `versions/` are immutable snapshots. Never edit their HTML, scripts, styles, assets, or checksums unless the user explicitly requests editing that archived edition.
- The root may follow the latest requested revision. Before changing it, preserve the outgoing edition in a new dated directory and record the source commit and SHA-256 hashes.
- Keep the version index and existing snapshot URLs accessible. Verify archived file hashes before publishing.
- The user has explicitly removed mouse-follow movement from the homepage. Preserve its full-screen photo/video composition and current font unless asked to change them.
