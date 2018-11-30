import React from "react";
import { __ } from "@wordpress/i18n";
import interpolateComponents from "interpolate-components";
import { setWarningMessage } from "../redux/actions/warning";
import getL10nObject from "./getL10nObject";

/**
 * Dispatches a warning message if analysis fails.
 * Provides a specific message when it happens within Recalibration beta or within default analysis.
 *
 * @returns {void}.
 */
export default function handleWorkerError() {
	const isRecalibrationBetaActive = getL10nObject().recalibrationBetaActive;

	let message = [];
	if ( isRecalibrationBetaActive ) {
		message = interpolateComponents( {
			/* Translators: {{link}} resolves to the link to SEO/Features, {{/link}} resolves to the link closing tag. */
			mixedString: __(
				"Sorry! Something went wrong while loading the recalibrated analysis beta! " +
				"{{link}}Please deactivate the recalibration beta in your features.{{/link}}",
				"wordpress-seo"
			),
			components: {
				link: <a href="/wp-admin/admin.php?page=wpseo_dashboard#top#features" target="_blank" />,
			},
		} );
	} else {
		message.push(
			__(
				"Sorry! Something went wrong while loading the analysis! If the problem persists please inform us about this error."
			)
		);
	}
	window.YoastSEO.store.dispatch( setWarningMessage( message ) );
}
