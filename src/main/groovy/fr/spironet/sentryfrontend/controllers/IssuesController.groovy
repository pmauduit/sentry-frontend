package fr.spironet.sentryfrontend.controllers

import groovy.json.JsonSlurper
import okhttp3.OkHttpClient
import okhttp3.Request
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/issues")
class SentryController {


  @Value('#{environment.SENTRY_TOKEN}')
  private final def SENTRY_TOKEN

  private def api_url = "https://sentry.io/api/0"

  private String getIssues(String org, String project, String customer) {
    def actualUrlStr = "${api_url}/projects/${org}/${project}/issues/?query=project:${customer}* webapp:geoserver* is:unresolved"

    def hc = new OkHttpClient()
    def request = new Request.Builder()
            .header("Authorization", "Bearer ${SENTRY_TOKEN}")
            .url(actualUrlStr)
            .build()
    hc.newCall(request).execute().with { response ->
      if (response.successful)
        return response.body().string()
      else
        "{}"
    }
  }

  @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  def defaultController() {
    def issues = this.getIssues("camptocamp", "georchestra", "geo2france")
    def ret = new JsonSlurper().parseText(issues)

    return new ResponseEntity<Object>(ret, HttpStatus.OK)
  }
}
